import './richtext.css';

import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { NodeSelection } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import { SampleBase } from './SampleBase';


// import { Button } from 'antd';




// import 'cdn.syncfusion.com/ej2/material.css';
export let glob_que = ''
export let opt_a = ''
export let opt_b = ''
export let opt_c = ''
export let opt_d = ''
export default class ImageSample extends SampleBase {
    state = {
        textvalue: ''
    }
    constructor() {
        super(...arguments);
        // set the value to RichTextEditor
        this.template = '';
        this.image = ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
            'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
            {
                tooltipText: 'Rotate Left',
                template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
            },
            {
                tooltipText: 'Rotate Right',
                template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
            }];
        this.quickToolbarSettings = {
            image: this.image
        };
    }
    onToolbarClick(e) {
        let nodeObj = new NodeSelection();
        let range = nodeObj.getRange(this.rteObj.contentModule.getDocument());
        let imgEle = nodeObj.getNodeCollection(range)[0];
        if(e.item){
            if (e.item.tooltipText === 'Rotate Right') {
                let transform = (imgEle.style.transform === '') ? 0 :
                    parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
                imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            }
            else if (e.item.tooltipText === 'Rotate Left') {
                let transform = (imgEle.style.transform === '') ? 0 :
                    Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
                imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            }
        }
        
    }
    onchange = (e) => {
        console.log("e", e);
        if(this.props.txttype==="que"){
            glob_que=e.value
        }
        else if(this.props.txttype==="opt_a"){
            opt_a=e.value
        }
        else if(this.props.txttype==="opt_b"){
            opt_b=e.value
        }
        else if(this.props.txttype==="opt_c"){
            opt_c=e.value
        }
        else if(this.props.txttype==="opt_d"){
            opt_d=e.value
        }
        this.setState({ textvalue: e.value });

        // document.getElementById("txtarea").innerHTML = this.state.question;
    }
    // clickOnAdd=()=>{
    //     glob_que=this.state.question
    //     console.log("qtg",glob_que)

    // }
    render() {
        return (
                // <body class="material" >
                <div className='control-pane'>
                    <div className='control-section' id='rteImage' style={{overflow:"inherit"}} >
                        <div className="content-wrapper" >
                            <RichTextEditorComponent id="defaultRTE"
                                style={{ position: 'sticky' }}
                                ref={(richtexteditor) => { this.rteObj = richtexteditor; }}
                                toolbarClick={this.onToolbarClick.bind(this)}
                                valueTemplate={this.state.textvalue}
                                quickToolbarSettings={this.quickToolbarSettings}
                                change={this.onchange.bind(this)}
                                placeholder={this.props.text}>
                                <Inject services={[HtmlEditor, Toolbar, Image, QuickToolbar, Link]} />
                            </RichTextEditorComponent>
                            {/* <div id="txtarea"></div>
                            <Button onClick={this.clickOnAdd}>Add</Button> */}
                        </div>
                    </div>
                </div>
            // </body>
           );
    }
}
