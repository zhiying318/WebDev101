interface AlloResto {
    restaurants: Restaurant[];
    categories: Category[];
    restaurantCategories: RestaurantCategory[];
  }
  
  interface Category {
    id?: string;
    name?: string;
    restaurantIds?: string[];
  }
  
  interface RestaurantCategory {
    restaurantId?: string;
    categoryId?: string;
  }
  
  interface Restaurant {
    id?: string;
    name?: string;
    description?: string;
    categoryIds?: string[];
  }
  
  //interfaces créées avec le site https://app.quicktype.io/
  
  abstract class HttpClient<T> {
    protected url: string;
    protected options: RequestInit;
  
    constructor(url: string) {
      this.url = url;
      this.options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  
    public async execute(): Promise<T | void> {
      try {
        const response = await fetch(this.url, this.options);
        if (response.ok) {
        const data: T = await response.json(); //extraction du corps de la réponse au format JSON
        return data;
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    }
  }


  class CreateClient<T> extends HttpClient<T> {
    constructor(url: string, data: T) {
      super(url);
      this.options.method = "POST";
      this.options.body = JSON.stringify(data);
    }
  }
  
  class ReadClient<T> extends HttpClient<T> {
    constructor(url: string) {
      super(url);
      this.options.method = "GET";
    }
  }
  
  class UpdateClient<T> extends HttpClient<T> {
    constructor(url: string, data: T) {
      super(url);
      this.options.method = "PATCH";
      this.options.body = JSON.stringify(data);
    }
  }
  
  class DeleteClient<T> extends HttpClient<T> {
    constructor(url: string) {
      super(url);
      this.options.method = "DELETE";
    }
  }




  const url = "http://localhost:3000/restaurants";
  const categoriesUrl = "http://localhost:3000/categories";
  const restaurantCategoriesUrl = "http://localhost:3000/restaurantCategories";
  
  // 辅助函数处理删除餐厅及相关联的数据
  async function deleteRestaurantAndUpdateRelations(restaurantId: string): Promise<void> {
    const getClient = new ReadClient<Restaurant>(`${url}/${restaurantId}`);
    const restaurant = await getClient.execute();
    if (!restaurant) return;
  
    const deleteClient = new DeleteClient<Restaurant>(`${url}/${restaurantId}`);
    const deletedRestaurant = await deleteClient.execute();
    if (!deletedRestaurant) return;
  
    console.log(`DELETE id : ${deletedRestaurant.id} name : ${deletedRestaurant.name} `);
  
    // 更新关联的分类
    const categoryIds = restaurant.categoryIds || [];
    for (const categoryId of categoryIds) {
      const getCategoryClient = new ReadClient<Category>(`${categoriesUrl}/${categoryId}`);
      const category = await getCategoryClient.execute();
      if (category) {
        const updatedRestaurantIds = category.restaurantIds?.filter(id => id !== restaurantId) || [];
        const updateCategoryClient = new UpdateClient<Category>(`${categoriesUrl}/${categoryId}`, {
          restaurantIds: updatedRestaurantIds
        });
        await updateCategoryClient.execute();
      }
    }
  
    // 删除关联的restaurantCategories
    const deleteRestaurantCategoriesClient = new DeleteClient(`${restaurantCategoriesUrl}?restaurantId=${restaurantId}`);
    await deleteRestaurantCategoriesClient.execute();
  }
  
  // 辅助函数处理创建餐厅及相关联的数据
  async function createRestaurantAndRelations(data: Restaurant): Promise<Restaurant | void> {
    const createClient = new CreateClient<Restaurant>(url, data);
    const createdRestaurant = await createClient.execute();
    if (createdRestaurant && createdRestaurant.id) {
      console.log(`CREATE id : ${createdRestaurant.id} name : ${createdRestaurant.name} `);
  
      const categoryIds = data.categoryIds || [];
      for (const categoryId of categoryIds) {
        const getCategoryClient = new ReadClient<Category>(`${categoriesUrl}/${categoryId}`);
        const category = await getCategoryClient.execute();
        if (category) {
          const updatedRestaurantIds = [...(category.restaurantIds || []), createdRestaurant.id];
          const updateCategoryClient = new UpdateClient<Category>(`${categoriesUrl}/${categoryId}`, {
            restaurantIds: updatedRestaurantIds
          });
          await updateCategoryClient.execute();
  
          // 创建新的restaurantCategory
          const createRestaurantCategoryClient = new CreateClient<RestaurantCategory>(restaurantCategoriesUrl, {
            restaurantId: createdRestaurant.id,
            categoryId: categoryId
          });
          await createRestaurantCategoryClient.execute();
        }
      }
      return createdRestaurant;
    }
  }
  
  // 辅助函数处理更新餐厅及相关联的数据
  async function updateRestaurantAndRelations(restaurantId: string, updatedData: Restaurant): Promise<Restaurant | void> {
    const getClient = new ReadClient<Restaurant>(`${url}/${restaurantId}`);
    const originalRestaurant = await getClient.execute();
    if (!originalRestaurant) return;
  
    const updateClient = new UpdateClient<Restaurant>(`${url}/${restaurantId}`, updatedData);
    const updatedRestaurant = await updateClient.execute();
    if (!updatedRestaurant) return;
  
    console.log(`UPDATE id : ${updatedRestaurant.id} name : ${updatedRestaurant.name} `);
  
    if (updatedData.categoryIds !== undefined) {
      const originalCategoryIds = originalRestaurant.categoryIds || [];
      const newCategoryIds = updatedData.categoryIds || [];
      const addedIds = newCategoryIds.filter(id => !originalCategoryIds.includes(id));
      const removedIds = originalCategoryIds.filter(id => !newCategoryIds.includes(id));
  
      // 处理新增的分类
      for (const categoryId of addedIds) {
        const getCategoryClient = new ReadClient<Category>(`${categoriesUrl}/${categoryId}`);
        const category = await getCategoryClient.execute();
        if (category) {
          const updatedRestaurantIds = [...(category.restaurantIds || []), restaurantId];
          const updateCategoryClient = new UpdateClient<Category>(`${categoriesUrl}/${categoryId}`, {
            restaurantIds: updatedRestaurantIds
          });
          await updateCategoryClient.execute();
  
          // 创建新的restaurantCategory
          const createRestaurantCategoryClient = new CreateClient<RestaurantCategory>(restaurantCategoriesUrl, {
            restaurantId: restaurantId,
            categoryId: categoryId
          });
          await createRestaurantCategoryClient.execute();
        }
      }
  
      // 处理移除的分类
      for (const categoryId of removedIds) {
        const getCategoryClient = new ReadClient<Category>(`${categoriesUrl}/${categoryId}`);
        const category = await getCategoryClient.execute();
        if (category) {
          const updatedRestaurantIds = category.restaurantIds?.filter(id => id !== restaurantId) || [];
          const updateCategoryClient = new UpdateClient<Category>(`${categoriesUrl}/${categoryId}`, {
            restaurantIds: updatedRestaurantIds
          });
          await updateCategoryClient.execute();
  
          // 删除对应的restaurantCategory
          const deleteRestaurantCategoryClient = new DeleteClient(`${restaurantCategoriesUrl}?restaurantId=${restaurantId}&categoryId=${categoryId}`);
          await deleteRestaurantCategoryClient.execute();
        }
      }
    }
  
    return updatedRestaurant;
  }
  
  // 示例调用
  async function main() {
    // 读取所有餐厅
    const readClient = new ReadClient<Restaurant[]>(url);
    const restaurants = await readClient.execute();
    if (restaurants) {
      restaurants.forEach((restaurant) => {
        console.log(`READ id : ${restaurant.id} name : ${restaurant.name} `);
      });
    }
  
    // 删除餐厅 "Le Café Rigolo"
    await deleteRestaurantAndUpdateRelations('3aa8');
  
    // 创建新餐厅
    const newRestaurantData: Restaurant = {
      name: "Le Restaurant de la Joie",
      description: "Un restaurant où la joie est au menu",
      categoryIds: ["71b2"],
    };
    await createRestaurantAndRelations(newRestaurantData);
  
    // 更新餐厅名称
    const updatedRestaurantData: Restaurant = {
      name: "Le Grill Super Marrant",
    };
    await updateRestaurantAndRelations('12b3', updatedRestaurantData);
  }
  
  main();

  export{main}
  
  