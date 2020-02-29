const Config = {
    name: "acortino",
    scale: 1,
    Links: [
        [
            "site",
            [
                ["reddit", "https://www.reddit.com"],
                ["link", "https://www.example.com"]
            ]
        ],
        [
            "site",
            [
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"]
            ]
        ],
        [
            "site",
            [
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"]
            ]
        ],
        [
            "site",
            [
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"]
            ]
        ]
    ]
}

Array.prototype.containsArray = function (val) {

}

const Main = (() => {
        const list = document.getElementById("list");
        const names = document.querySelectorAll("[data-Name]");
        const search = document.getElementById("search");
        const autocompleteResult = document.getElementById('autocomplete');

        const form = document.forms[0];

        const submit = (eventKey) => {
            eventKey.preventDefault();
            let results = getMatchedLink(search.value, true);
            if (results.length == 1) {
                window.location = results[0][1];
            } else {
                form.submit()
            }

        }

        const getMatchedLink = (valueSearched, exactMatch) => {
            let regex = `.*` + search.value + `.*`;
            let resultArr = new Array();

            Config.Links.map(([gName, Links]) => {
                Links.map(([lName, url]) => {
                    if (exactMatch) {
                        if (lName == search.value) {
                            resultArr.push(new Array(lName, url));
                        }
                    } else {
                        if (lName.match(regex) || url.match(regex)) {
                            resultArr.push(new Array(lName, url));
                        }
                    }
                });
            });

            return resultArr;
        }

        const createAutocompleteLinks = (resultsArr) => {
            return resultsArr.map(([lName, url]) => `<a href="${url}" class="autocomplete-matchs">${lName}</a>`
            ).join("")

        }

        const autocomplete = (eventKey) => {
            eventKey.preventDefault();
            autocompleteResult.innerHTML = null;
            let results = getMatchedLink(search.value, false);

            if (results.length == 1) {
                search.value = results[0][0];
            } else {
                autocompleteResult.innerHTML = createAutocompleteLinks(results);
            }

        }

        const init = () => {
            list.innerHTML = Config.Links.map(([gName, Links]) => `
            <li>
                <h1 onclick="this.parentNode.classList.toggle('hideChildren')">${gName}</h1>
                <ul>
                    ${Links.map(([lName, url]) => `
                        <li>
                            <a href="${url}">${lName}</a>
                        </li>`
                ).join("")}
                </ul>
            </li>`
            ).join("")

            names.forEach(el => {
                el.innerText = Config.name;
            });

            document.addEventListener("keydown", e => e.key.length === 1 && search.focus());
            //Search on <enter>
            search.addEventListener("keydown", e => (window.event ? event.keyCode : e.which) == 13 && submit(e));
            //Autocomplete on <tab>
            search.addEventListener('keydown', e => (window.event ? event.keyCode : e.which) == 9 && autocomplete(e));
        };

        return {
            init,
        };
    }
)();


Main.init()
