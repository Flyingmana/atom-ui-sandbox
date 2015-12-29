"use babel";

export default class ActionView {

  constructor(properties) {
    this.panel = null;
    this.initialize();
  }

  initialize() {
    this.attach();
  }

  attach() {
    if (this.panel == null) {
      var element = document.createElement("div");
      element.innerHTML = this.render();
      element.onclick = function(e) {
        var target = e.target;
        if (target.classList.contains('action-box')) {
          var event =  new CustomEvent(target.dataset.command, {
            bubbles: true,
            cancelable: true
          });
          atom.views.getView(atom.workspace).dispatchEvent(event);
        }
      };
      this.panel = atom.workspace.addLeftPanel({
        item: element,
        priority: 20
      });

    }
  }

  render() {
    let boxes = [
      {
        title: 'CMD',
        command: 'command-palette:toggle'
      }
    ];

    let boxesHtml = '';
    boxes
    for (var box of boxes) {
      boxesHtml += `<div class="element action-box" data-command="${box.command}">
        ${box.title}
      </div>`;
    }

    return `
    <style>
      .ui-sandbox-action-container { padding: 5px; }
      .ui-sandbox-action-container .action-box{
        padding: 5px;
        width: 50px;
        height: 50px;
        border: 1px solid darkgray;
      }
    </style>
    <div class="ui-sandbox-action-container">
    <span>placeholder for action box</span>
    ${boxesHtml}
    </div>
    `;
  }

  deactivate() {
    this.detach;
  }

  detach() {
    this.panel.destroy();
    this.panel = null;
  }
}
