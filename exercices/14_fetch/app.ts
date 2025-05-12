// app2.ts

interface Address {
    city: string;
    postcode: string;
    street: string;
    housenumber: string;
    context: string;
    lat: number;
    lon: number;
  }
  
  class AddressService {
    async searchAddress(query: string, limit: number): Promise<Address[]> {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://api-adresse.data.gouv.fr/search/?q=${encodedQuery}&limit=${limit}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        const addresses: Address[] = data.features.map((feature: any) => {
          const props = feature.properties;
          return {
            city: props.city,
            postcode: props.postcode,
            street: props.street || '', 
            housenumber: props.housenumber || '',
            context: props.context,
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
          };
        });
  
        return addresses;
      } catch (error) {
        console.error("Erreur lors de la recherche d'adresse :", error);
        return [];
      }
    }
  }
  

  
  export const addressService = new AddressService();
  
//   addressService.searchAddress("8 bd du port", 5).then((results) => {
//     const ul = document.createElement("ul");
  
//     results.forEach((address) => {
//       const li = document.createElement("li");
//       li.textContent = `${address.city}, ${address.postcode}, ${address.street} ${address.housenumber} (${address.context}) [${address.lat}, ${address.lon}]`;
//       ul.appendChild(li);
//     });
  
//     document.getElementById("ex2")?.appendChild(ul);
//   });
  