import { Injectable } from "@angular/core";
import { ValidatorLogic } from './validator-logic';


@Injectable({providedIn:'root'})
export class PanelLogic{


  public IsConsoleShow:boolean=false;
  private Control:any;
  private AllControls:any;

  private pos1 = 0
  private  pos2 = 0
  private  pos3 = 0
  private  pos4 = 0;
  constructor(){

  }

  updateControlStatus(formControl,allControls) {

    this.Control = formControl;
    this.AllControls = allControls;

    let div = document.getElementById('__XConsl');

    if (!this.IsConsoleShow) {

        if (div) {
            div.style.display = "none";
        }

        return;
    }

    if (!div) {
        div = document.createElement('div');
        //let div =  document.createElement('div');


        div.style.position = "fixed"
        div.id = "__XConsl"
        div.style.top = "20px"
        div.style.zIndex = "999";
        div.style.minHeight = "350px";
        div.style.width = "350px";
        div.style.overflow = "auto";
        div.style.maxHeight = "90vh";
        div.style.right = "30px";
        div.style.padding = "0px";
        div.style.fontSize = "13px";
        div.style.border = "1px solid #dfdfdf";
        div.style.backgroundColor = "#fff";
        div.style.boxShadow = "0px 2px 3px #00000022";
        document.getElementsByTagName('body')[0].append(div)
    }

    div.style.display = "block";
    let content = "";



    setTimeout(() => {
     // this.dragElement(div)
        let controlCopy = this.Control.form.controls;
        //let AllControls = this.ValidatorLogic.GetAllControls(controlCopy);
        content += "<div id=\"_ngx-super-ff\" style='background-color:#707070;font-family:arial ;text-align:center;color:#fff;padding:4px;'>Form Valid : " +  this.Control.form.valid + " </div>"
        content +="<table style=\"width:100%;margin:4px;\" class=\"_ng-super-panel\">"
        content +="<tr>"
        content +="<th>Control</th><th>Validation</th><th>Value</th>"
        content +="</tr>"
        this.AllControls.forEach(e => {

            content += `<tr>
                      <td style="text-align:center;font-falimy:arial; border:1px solid #efefef;padding:2px`+ (e.errors ? `;border-left:4px solid #DA4667;color:#000;"` : `;border-left:4px solid #5EFF00;color:#555;`) + `"> ` + e.name + ` </td>  <td>  ` + JSON.stringify(e.errors) + `</td>
                      <td style="min-width:100px;">  `+e.value+` </span>
                   </tr>
        `
        })
        content +="</table>"


        div.innerHTML = content
    }, 200)



}

//dragElement(document.getElementById("mydiv"));

 dragElement(elmnt) {

  if (document.getElementById("_ngx-super-ff")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("_ngx-super-ff").onmousedown = this.dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = this.dragMouseDown;
  }
 }
   dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove =this. elementDrag;
  }

   elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 =  this.pos3 - e.clientX;
    this.pos2 =  this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    e.style.top = (e.offsetTop -  this.pos2) + "px";
    e.style.left = (e.offsetLeft -  this.pos1) + "px";
  }

   closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

}
