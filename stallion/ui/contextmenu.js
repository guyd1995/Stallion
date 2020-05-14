import {makeEscapable, StallionLookAndFeel} from "./common.js";
import {StallionUIStateManager} from "./ui_state_manager.js";
import { SlashBar } from "./slashbar.js";

var stallionContextMenuId = "stallionContextMenu"

class StallionContextMenuItem {

    constructor(name, func){
        this.name = name; 
        this.func = func;
    }

}



class StallionContextMenu {
    constructor(){
        this._isLoaded = false;
        this._items = this.getAllItems();

        StallionLookAndFeel.hideOnUnfocus(this);
        this.div = document.getElementById(stallionContextMenuId);
        if(!this.div){
            this.div = document.createElement("div");
            this.div.id = stallionContextMenuId;
            makeEscapable(this.div, ()=>{this.hide()})
            document.querySelector("body").appendChild(this.div);
        }
        this.hide();
        // this.loadEntirely = new Promise(()=>{this.startLoading()}); // GUY TODO: DO it in the right way

    }

    get focusStateName(){
        return "contextmenu";
    }

    getDiv(){
        return this.div;
    }

    _constructMenuItems(){
        var menuOptions = document.createElement("ul");
        menuOptions.classList.add("stallionContextMenuUL")
        for(var item of this._items){
            var itemDiv = document.createElement("li");
            itemDiv.classList.add("stallionContextMenuItem");
            itemDiv.innerText = item.name;
            itemDiv.onclick = ()=>{item.func(); this.hide()};
            menuOptions.appendChild(itemDiv)
        }
        this.div.appendChild(menuOptions);
    }

    
    async startLoading(){   // GUY TODO: Check this is done this way
        if(this._isLoaded)
            return;
        this._constructMenuItems();
        this._isLoaded = true;
    }

    reveal(mouseX, mouseY){
        StallionUIStateManager.focusWidget(this);
        this.div.style.left = `${mouseX}px`;
        this.div.style.top = `${mouseY}px`;

        this.div.classList.remove("hidden")
        console.log(this.div)
    }

    hide(){
        this.div.classList.add("hidden");
    }

    getAllItems(){
        return [
            new StallionContextMenuItem("Comment", ()=>{
                // GUY TODO: Fix = both functionality and code quality
            }),

            new StallionContextMenuItem("Lookup Reference Data..", ()=>{
                // GUY TODO: Fix = both functionality and code quality
            }),

            new StallionContextMenuItem("Preferences", ()=>{
                // GUY TODO: Fix = both functionality and code quality
            }),

            new StallionContextMenuItem("Download", ()=>{
                // GUY TODO: Fix = both functionality and code quality
            }),


        ]

    }


}





var contextMenu;

function openContextMenu(evt){
    
    if(!contextMenu)
        contextMenu = new StallionContextMenu();
    
    contextMenu.startLoading().then(()=>{contextMenu.reveal(evt.pageX, evt.pageY)})
}


export {openContextMenu}