'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as liveServer from 'live-server';
import ServerContentProvider from './Server';
import * as Constants from './Constants';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // let uri = vscode.Uri.parse(Constants.ExtensionConstants.PREVIEW_URI);
    // console.log("uri:" + uri)
    let documentFileName = Constants.ExtensionConstants.INDEX_PATH + Constants.ExtensionConstants.INDEX_NAME;
    let documentPath = Constants.ExtensionConstants.DOCUMENT_PATH;
    let documentName = Constants.ExtensionConstants.INDEX_NAME;
    let dirPath = context.extensionPath;
    console.log('extensionPath : ' + context.extensionPath);
    // class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
    // 	private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
    // 	public provideTextDocumentContent(uri: vscode.Uri): string {
    //         console.log("documentFileName:" + documentFileName);
    //         let str = fs.readFileSync(dirPath + documentFileName, 'UTF-8');
    //         str =  str.replace(/\$\{url\}/g, "//" + dirPath + "/Resources");
    // 		return str;
    // 	}
    // 	get onDidChange(): vscode.Event<vscode.Uri> {
    // 		return this._onDidChange.event;
    // 	}
    // 	public update(uri: vscode.Uri) {
    // 		this._onDidChange.fire(uri);
    //     }
    // }
    // let provider = new TextDocumentContentProvider();
    // let registration = vscode.workspace.registerTextDocumentContentProvider('HTMLPreview', provider);
    // vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
    // 	if (e.document === vscode.window.activeTextEditor.document) {
    // 		provider.update(uri);
    // 	}
    // });
    // vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
    // 	if (e.textEditor === vscode.window.activeTextEditor) {
    // 		provider.update(uri);
    // 	}
    // })
    // (1)方案2
    const uri = vscode.Uri.parse(`LiveServerPreview://authority/${documentFileName}`);
    console.log("uri:" + uri);
    liveServer.start({
        port: 0,
        host: '127.0.0.1',
        root: context.extensionPath,
        open: false
    });
    let disposable = vscode.commands.registerCommand('extension.OpenCodeView', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', uri, vscode.ViewColumn.Two, 'OpenCodeView').then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    });
    // (2)方案2
    vscode.workspace.registerTextDocumentContentProvider('LiveServerPreview', new ServerContentProvider());
    context.subscriptions.push(disposable);
    
    // context.subscriptions.push(disposable, registration);
}

// this method is called when your extension is deactivated
export function deactivate() {
    liveServer.shutdown();
}