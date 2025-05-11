// app2.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AddressService {
    searchAddress(query, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodedQuery = encodeURIComponent(query);
            const url = `https://api-adresse.data.gouv.fr/search/?q=${encodedQuery}&limit=${limit}`;
            try {
                const response = yield fetch(url);
                const data = yield response.json();
                const addresses = data.features.map((feature) => {
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
            }
            catch (error) {
                console.error("Erreur lors de la recherche d'adresse :", error);
                return [];
            }
        });
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
