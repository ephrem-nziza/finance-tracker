export function setupMenu(){
    let button = document.getElementById("menu-button");
    let nav = document.getElementById("main-nav");

    function closeMenu({
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
    })

    button.addEventListener("click", function(){
        let isOpen = nav.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    //On a phone the menu will close after you pick a link
    nav.addEventListener("click",  function(event){
        if (event.target.tagName === "A"){
            closeMenu();
        }
    });

    document.addEventListener("keydown", function(event){
        if(event.key === "Escape" && nav.classList.contains("open")){
            closeMenu();
            button.focus();
        }
    });
}