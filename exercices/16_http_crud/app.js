var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//interfaces créées avec le site https://app.quicktype.io/
class HttpClient {
    constructor(url) {
        this.url = url;
        this.options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url, this.options);
                if (response.ok) {
                    const data = yield response.json(); //extraction du corps de la réponse au format JSON
                    return data;
                }
            }
            catch (error) {
                console.error("There was a problem with the fetch operation: ", error);
            }
        });
    }
}
class CreateClient extends HttpClient {
    constructor(url, data) {
        super(url);
        this.options.method = "POST";
        this.options.body = JSON.stringify(data);
    }
}
class ReadClient extends HttpClient {
    constructor(url) {
        super(url);
        this.options.method = "GET";
    }
}
class UpdateClient extends HttpClient {
    constructor(url, data) {
        super(url);
        this.options.method = "PATCH";
        this.options.body = JSON.stringify(data);
    }
}
class DeleteClient extends HttpClient {
    constructor(url) {
        super(url);
        this.options.method = "DELETE";
    }
}
const url = "http://localhost:3000/restaurants";
const categoriesUrl = "http://localhost:3000/categories";
const restaurantCategoriesUrl = "http://localhost:3000/restaurantCategories";
// 辅助函数处理删除餐厅及相关联的数据
function deleteRestaurantAndUpdateRelations(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const getClient = new ReadClient(`${url}/${restaurantId}`);
        const restaurant = yield getClient.execute();
        if (!restaurant)
            return;
        const deleteClient = new DeleteClient(`${url}/${restaurantId}`);
        const deletedRestaurant = yield deleteClient.execute();
        if (!deletedRestaurant)
            return;
        console.log(`DELETE id : ${deletedRestaurant.id} name : ${deletedRestaurant.name} `);
        // 更新关联的分类
        const categoryIds = restaurant.categoryIds || [];
        for (const categoryId of categoryIds) {
            const getCategoryClient = new ReadClient(`${categoriesUrl}/${categoryId}`);
            const category = yield getCategoryClient.execute();
            if (category) {
                const updatedRestaurantIds = ((_a = category.restaurantIds) === null || _a === void 0 ? void 0 : _a.filter(id => id !== restaurantId)) || [];
                const updateCategoryClient = new UpdateClient(`${categoriesUrl}/${categoryId}`, {
                    restaurantIds: updatedRestaurantIds
                });
                yield updateCategoryClient.execute();
            }
        }
        // 删除关联的restaurantCategories
        const deleteRestaurantCategoriesClient = new DeleteClient(`${restaurantCategoriesUrl}?restaurantId=${restaurantId}`);
        yield deleteRestaurantCategoriesClient.execute();
    });
}
// 辅助函数处理创建餐厅及相关联的数据
function createRestaurantAndRelations(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const createClient = new CreateClient(url, data);
        const createdRestaurant = yield createClient.execute();
        if (createdRestaurant && createdRestaurant.id) {
            console.log(`CREATE id : ${createdRestaurant.id} name : ${createdRestaurant.name} `);
            const categoryIds = data.categoryIds || [];
            for (const categoryId of categoryIds) {
                const getCategoryClient = new ReadClient(`${categoriesUrl}/${categoryId}`);
                const category = yield getCategoryClient.execute();
                if (category) {
                    const updatedRestaurantIds = [...(category.restaurantIds || []), createdRestaurant.id];
                    const updateCategoryClient = new UpdateClient(`${categoriesUrl}/${categoryId}`, {
                        restaurantIds: updatedRestaurantIds
                    });
                    yield updateCategoryClient.execute();
                    // 创建新的restaurantCategory
                    const createRestaurantCategoryClient = new CreateClient(restaurantCategoriesUrl, {
                        restaurantId: createdRestaurant.id,
                        categoryId: categoryId
                    });
                    yield createRestaurantCategoryClient.execute();
                }
            }
            return createdRestaurant;
        }
    });
}
// 辅助函数处理更新餐厅及相关联的数据
function updateRestaurantAndRelations(restaurantId, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const getClient = new ReadClient(`${url}/${restaurantId}`);
        const originalRestaurant = yield getClient.execute();
        if (!originalRestaurant)
            return;
        const updateClient = new UpdateClient(`${url}/${restaurantId}`, updatedData);
        const updatedRestaurant = yield updateClient.execute();
        if (!updatedRestaurant)
            return;
        console.log(`UPDATE id : ${updatedRestaurant.id} name : ${updatedRestaurant.name} `);
        if (updatedData.categoryIds !== undefined) {
            const originalCategoryIds = originalRestaurant.categoryIds || [];
            const newCategoryIds = updatedData.categoryIds || [];
            const addedIds = newCategoryIds.filter(id => !originalCategoryIds.includes(id));
            const removedIds = originalCategoryIds.filter(id => !newCategoryIds.includes(id));
            // 处理新增的分类
            for (const categoryId of addedIds) {
                const getCategoryClient = new ReadClient(`${categoriesUrl}/${categoryId}`);
                const category = yield getCategoryClient.execute();
                if (category) {
                    const updatedRestaurantIds = [...(category.restaurantIds || []), restaurantId];
                    const updateCategoryClient = new UpdateClient(`${categoriesUrl}/${categoryId}`, {
                        restaurantIds: updatedRestaurantIds
                    });
                    yield updateCategoryClient.execute();
                    // 创建新的restaurantCategory
                    const createRestaurantCategoryClient = new CreateClient(restaurantCategoriesUrl, {
                        restaurantId: restaurantId,
                        categoryId: categoryId
                    });
                    yield createRestaurantCategoryClient.execute();
                }
            }
            // 处理移除的分类
            for (const categoryId of removedIds) {
                const getCategoryClient = new ReadClient(`${categoriesUrl}/${categoryId}`);
                const category = yield getCategoryClient.execute();
                if (category) {
                    const updatedRestaurantIds = ((_a = category.restaurantIds) === null || _a === void 0 ? void 0 : _a.filter(id => id !== restaurantId)) || [];
                    const updateCategoryClient = new UpdateClient(`${categoriesUrl}/${categoryId}`, {
                        restaurantIds: updatedRestaurantIds
                    });
                    yield updateCategoryClient.execute();
                    // 删除对应的restaurantCategory
                    const deleteRestaurantCategoryClient = new DeleteClient(`${restaurantCategoriesUrl}?restaurantId=${restaurantId}&categoryId=${categoryId}`);
                    yield deleteRestaurantCategoryClient.execute();
                }
            }
        }
        return updatedRestaurant;
    });
}
// 示例调用
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 读取所有餐厅
        const readClient = new ReadClient(url);
        const restaurants = yield readClient.execute();
        if (restaurants) {
            restaurants.forEach((restaurant) => {
                console.log(`READ id : ${restaurant.id} name : ${restaurant.name} `);
            });
        }
        // 删除餐厅 "Le Café Rigolo"
        yield deleteRestaurantAndUpdateRelations('3aa8');
        // 创建新餐厅
        const newRestaurantData = {
            name: "Le Restaurant de la Joie",
            description: "Un restaurant où la joie est au menu",
            categoryIds: ["71b2"],
        };
        yield createRestaurantAndRelations(newRestaurantData);
        // 更新餐厅名称
        const updatedRestaurantData = {
            name: "Le Grill Super Marrant",
        };
        yield updateRestaurantAndRelations('12b3', updatedRestaurantData);
    });
}
main();
export { main };
