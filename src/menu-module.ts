namespace menu {
    export function init() : void {

        let menuItems = document.getElementsByClassName("menu");
        for(let menuItem of menuItems) {
            console.log(menuItem);
            menuItem.addEventListener("click", onMenuClick)
        }

        // close open menu when document is clicked outside
        document.addEventListener("mouseup", (event: MouseEvent) => {
            let targetElement = <Element>event.target;
            if(targetElement.closest(".dropdown-content") === null && targetElement.closest(".menu") === null) {
                let contentElements = document.getElementsByClassName("dropdown-content");
                for(let contentElement of contentElements) {
                    if(contentElement.classList.contains("dropdown-content-visible")) {
                        contentElement.classList.remove("dropdown-content-visible");
                    }
                }
            }
        });
    }

    function onMenuClick(event: MouseEvent) : void {
        let menuElement = <Element>event.target;
        let currentContentElement = menuElement.parentElement.querySelector(".dropdown-content")

        let contentElements = document.getElementsByClassName("dropdown-content");
        for(let contentElement of contentElements) {
            if(contentElement === currentContentElement) {
                currentContentElement.classList.toggle("dropdown-content-visible");
            }
            else {
                contentElement.classList.remove("dropdown-content-visible");
            }
        }
    }
}