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

const Main = (() => {
    const list = document.getElementById("list");
    const names = document.querySelectorAll("[data-Name]");
    const search = document.getElementById("search");
    const autocompleteField = document.getElementById('autocomplete');

    const form = document.forms[0];

    const autocomplete = (eventKey) => {
        eventKey.preventDefault();
        autocompleteField.innerHTML = null;
        let regex = `.*` + search.value + `.*`;
        Config.Links.map(([gName, Links]) => {
            Links.map(([lName, url]) => {
                if (lName.match(regex) || url.match(regex)) {
                    autocompleteField.innerHTML += `<a href="${url}"> ${lName} </a>`
                }
            });
        });
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
        search.addEventListener("keydown", e => (window.event ? event.keyCode : e.which) == 13 && form.submit());
        //Autocomplete on <tab>
        search.addEventListener('keydown', e => (window.event ? event.keyCode : e.which) == 9 && autocomplete(e));
    };

    return {
        init,
    };
})();

Main.init()
