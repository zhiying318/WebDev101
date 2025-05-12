var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const euCountries = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia",
    "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia",
    "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania",
    "Slovakia", "Slovenia", "Spain", "Sweden"
];
export function showSelectedCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.getElementById('country-list');
        if (!container)
            return;
        const res = yield fetch('https://restcountries.com/v3.1/all');
        const allCountries = yield res.json();
        let selectedCountries = allCountries.filter((country) => euCountries.includes(country.name.common));
        // 按国家名首字母排序
        selectedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        const populationData = [];
        const areaData = [];
        // 图表容器提前添加
        const chartWrapper = document.createElement('div');
        chartWrapper.id = 'chart-wrapper';
        chartWrapper.innerHTML = `<canvas id="euChart" width="800" height="400"></canvas>`;
        container.appendChild(chartWrapper);
        // 卡片容器
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-container';
        container.appendChild(cardWrapper);
        selectedCountries.forEach((country) => {
            const name = country.name.common;
            const population = country.population;
            const area = country.area;
            populationData.push({ name, value: population });
            areaData.push({ name, value: area });
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag" />
        <div class="card-info">
            <span class="field"><strong>${country.name.official}</strong></span>
            <span class="field">Population: ${population.toLocaleString()}</span>
            <span class="field">Area: ${area.toLocaleString()} km²</span>
            <span class="field">Region: ${country.region}</span>
        </div>
        `;
            cardWrapper.appendChild(card);
        });
        // ranking the countries by population
        // and sorting the area data based on the population ranking
        populationData.sort((a, b) => b.value - a.value);
        areaData.sort((a, b) => {
            const match = populationData.find(p => p.name === b.name);
            return match ? 1 : -1;
        });
        const ctx = document.getElementById("euChart");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: populationData.map(d => d.name),
                datasets: [
                    {
                        label: "Population",
                        data: populationData.map(d => d.value),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        yAxisID: "y1"
                    },
                    {
                        label: "Area (km²)",
                        data: areaData.map(d => d.value),
                        backgroundColor: "rgba(255, 159, 64, 0.6)",
                        yAxisID: "y2"
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y1: {
                        type: "linear",
                        position: "left",
                        title: { display: true, text: "Population" }
                    },
                    y2: {
                        type: "linear",
                        position: "right",
                        grid: { drawOnChartArea: false },
                        title: { display: true, text: "Area (km²)" }
                    }
                }
            }
        });
    });
}
