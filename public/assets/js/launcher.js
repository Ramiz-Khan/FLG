    function createLauncherPanel() {
        var div = document.createElement("div");
        div.setAttribute("class", "launcher-panel");
        div.classList.add("hidden");
        div.appendChild(createLauncherLink(div));

        document.getElementsByTagName("body").appendChild(div);

        return div;
    }

    function createLauncherLink(container) {
        var link = document.createElement("link");

        link.setAttribute("rel", "import");
        link.setAttribute("href", "path_to_my_launcher_page.html");

        link.onload = function () {
            container.appendChild(link.import.querySelector('.launcher-main-container'));
        };

        return link;
    }
    
    createLauncherPanel();