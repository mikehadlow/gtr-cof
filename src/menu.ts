export function init(): void {

    const menuItems = document.getElementsByClassName("menu");
    for (const menuItem of menuItems) {
        menuItem.addEventListener("click", onMenuClick)
    }

    // close open menu when document is clicked outside
    document.addEventListener("mouseup", (event: MouseEvent) => {
        const targetElement = <Element>event.target;
        if (targetElement.closest(".dropdown-content") === null && targetElement.closest(".menu") === null) {
            const contentElements = document.getElementsByClassName("dropdown-content");
            for (const contentElement of contentElements) {
                if (contentElement.classList.contains("dropdown-content-visible")) {
                    contentElement.classList.remove("dropdown-content-visible");
                }
            }
        }
    });
}

function onMenuClick(event: Event): void {
    const menuElement = <Element>event.target;
    const currentContentElement = menuElement.parentElement!.querySelector(".dropdown-content")

    const contentElements = document.getElementsByClassName("dropdown-content");
    for (const contentElement of contentElements) {
        if (contentElement === currentContentElement) {
            currentContentElement!.classList.toggle("dropdown-content-visible");
        }
        else {
            contentElement.classList.remove("dropdown-content-visible");
        }
    }
}
