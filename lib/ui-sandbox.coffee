UiSandboxView = require './ui-sandbox-view'
{CompositeDisposable} = require 'atom'

module.exports = UiSandbox =
  uiSandboxView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @uiSandboxView = new UiSandboxView(state.uiSandboxViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @uiSandboxView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'ui-sandbox:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @uiSandboxView.destroy()

  serialize: ->
    uiSandboxViewState: @uiSandboxView.serialize()

  toggle: ->
    console.log 'UiSandbox was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
