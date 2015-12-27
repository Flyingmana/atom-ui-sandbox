"use babel";

import UiSandboxView from './ui-sandbox-view';
import { CompositeDisposable } from 'atom';

export default {
  uiSandboxView: null,
  modalPanel: null,
  subscriptions: null,


  activate(state) {

    console.log('UiSandbox was activated!');
    this.uiSandboxView = new UiSandboxView(state.uiSandboxViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.uiSandboxView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ui-sandbox:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.uiSandboxView.destroy();
  },

  serialize() {
    return {
      uiSandboxViewState: this.uiSandboxView.serialize()
    };
  },

  toggle() {
    console.log('UiSandbox was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

}
