function show_pop_up (ageRating, oldEnoughToWatch)
{
wrapperDiv = document.createElement("div");
wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");

iframeElement = document.createElement("iframe");
iframeElement.setAttribute("style","width: 100%; height: 100%;");

wrapperDiv.appendChild(iframeElement);

modalDialogParentDiv = document.createElement("div");
modalDialogParentDiv.setAttribute("style","position: absolute; width: 590px; height: 370px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");

modalDialogSiblingDiv = document.createElement("div");

modalDialogTextDiv = document.createElement("div");
modalDialogTextDiv.setAttribute("style" , "text-align:center");



modalDialogTextSpan = document.createElement("span");
modalDialogText = document.createElement("strong");
modalDialogText.innerHTML = '';

breakElement = document.createElement("br");
imageElement = document.createElement("img");
imageElement.setAttribute("style" , "width: 100%; height: 100%; text-align:center");
if (ageRating == 12) { console.log('12 fired');
  imageElement.src = chrome.extension.getURL("images/Nicam12.jpg"); }
if (ageRating == 16) { console.log('16 fired');
  imageElement.src = chrome.extension.getURL("images/Nicam16.jpg"); }

// modalDialogTextSpan.appendChild(modalDialogText);
// modalDialogTextDiv.appendChild(breakElement);
// modalDialogTextDiv.appendChild(modalDialogTextSpan);
modalDialogTextDiv.appendChild(imageElement);

modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

document.body.appendChild(wrapperDiv);
document.body.appendChild(modalDialogParentDiv);
}

