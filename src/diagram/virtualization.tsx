import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  HierarchicalTree,
  DataBinding,
  DiagramComponent,
  ConnectorModel,
  SnapConstraints,DiagramConstraints,
  Inject,
  DiagramTools,ZoomOptions,
  Rect,
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { hierarchicalTree, virtualizationData } from './diagram-data';
import {
  ToolbarComponent,
  ClickEventArgs
} from "@syncfusion/ej2-react-navigations";

export interface EmployeeInfo {
  Name: string;
}
// custom code start
const SAMPLE_CSS = `@font-face {
  font-family: 'e-ddb-icons';
  src: url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
  font-weight: normal;
  font-style: normal;
}

.e-ddb-icons {
  font-family: 'e-ddb-icons';
  speak: none;
  font-size: 55px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.e-zoomin::before {
  content: "\e70c";
}

.e-zoomout::before {
  content: "\e70d";
}

.e-reset::before {
  content: "\e715";
}`;
// custom code end
let diagramInstance: DiagramComponent;
let virtualData: any = new DataManager(dataVirtualization());
let bound: Rect = new Rect(100, 100, 500, 100);
function dataVirtualization() {
  let i: number = 0, j, k, name, parentName;
  let data = [];
  parentName = virtualizationData[0].Name;
  data.push({ 'Name': parentName, 'Parent': "" })
  i++;
  for (j = 1; j < 100; j++) {
    name = virtualizationData[i].Name
    data.push({ 'Name': name, 'Parent': parentName })
    i++;
    for (k = 0; k < 2; k++) {
      data.push({ 'Name': virtualizationData[i].Name, 'Parent': name })
      i++;
    }
  }
  return data;
}
export class VirtualizationModel extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: bound });
  }
  render() {
    return (
      <div>
        {/* custom code start */}
        <style>{SAMPLE_CSS}</style>
        {/* custom code end*/}
        <div>
          <div style={{ width: "100%" }}>
            {/* create and add ZoomIn,ZoomOut and Reset options in ToolBar. */}
            <ToolbarComponent
              id="toolbar_diagram"
              clicked={onItemClick}
              items={[
                {
                  type: "Button",
                  tooltipText: "ZoomIn",
                  text: "Zoom In",
                  prefixIcon: "e-diagram-icons e-diagram-zoomin"
                },
                { type: "Separator" },
                {
                  type: "Button",
                  tooltipText: "ZoomOut",
                  text: "Zoom Out",
                  prefixIcon: "e-diagram-icons e-diagram-zoomout"
                },
                { type: "Separator" },
                {
                  type: "Button",
                  tooltipText: "Reset",
                  text: "Reset",
                  prefixIcon: "e-diagram-icons e-diagram-reset"
                }
              ]}
            />
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"500px"}
              snapSettings={{ constraints: SnapConstraints.None }} //configures data source settings
              dataSourceSettings={{
                dataSource: virtualData,
                parentId: "Parent",
                id: "Name"
              }} //Disables all interactions except zoom/pan
              tool={DiagramTools.ZoomPan} //Configures automatic layout
              layout={{
                type: 'HierarchicalTree',
                margin: { left: 10, top: 10 },
                horizontalSpacing: 40.0,
                verticalSpacing: 50.0,
                orientation: 'TopToBottom',
              }} //Defines the default node and connector properties
              getNodeDefaults={(obj: Node) => {
                return nodeDefaults(obj);
              }}
              constraints={DiagramConstraints.Default | DiagramConstraints.Virtualization}
              getConnectorDefaults={(
                connector: ConnectorModel
              ) => {
                return connectorDefaults(connector);
              }}
            >
              <Inject
                services={[DataBinding, HierarchicalTree]}
              />
            </DiagramComponent>
          </div>
        </div>

        <div id="action-description">
        <p>
        This sample demonstrates the default UI virtualization functionality. Scroll the diagram for UI virtualization
        experience.
    </p>
        </div>
        <div id="description">
        <p>
        Drawing huge amounts of nodes and connectors on initial loading slows the rendering process down. Syncfusion
        virtualization support helps improve the performance on initial rendering. Virtualization can be enabled by
        adding the <code>Virtualization</code> flag to the <code>constraints</code> property of the diagram.
    </p>
          <br />
        </div>
      </div>
    );
  }
}

//sets node default value
function nodeDefaults(obj: any): Node {
  obj.shape = { type: 'Text', content: obj.data.Name,shape: 'Rectangle', cornerRadius: 5 };
    obj.style = { fill: '#659be5', strokeColor: 'none', color: 'white', strokeWidth: 2 };
    obj.backgroundColor = '#659be5';
    obj.margin = { left: 5, right: 5, bottom: 5, top: 5 };
    obj.width = 80;
    obj.height = 30;
    return obj;
}

//sets connector default value
function connectorDefaults(
  connector: ConnectorModel
  
): ConnectorModel {
  connector.type = 'Orthogonal';
    connector.cornerRadius = 7;
    connector.targetDecorator.height = 7;
    connector.targetDecorator.width = 7;
    connector.style.strokeColor = '#6d6d6d';
  return connector;
}


//based on the option, Click event to perform ZoomIn,ZoomOut and Reset.
function onItemClick(args: ClickEventArgs): void {
  switch (args.item.text) {
    case "Zoom In":
      let zoomin: ZoomOptions = { type: "ZoomIn", zoomFactor: 0.2 };
      diagramInstance.zoomTo(zoomin);
      break;
    case "Zoom Out":
      let zoomout: ZoomOptions = { type: "ZoomOut", zoomFactor: 0.2 };
      diagramInstance.zoomTo(zoomout);
      break;
    case "Reset":
      diagramInstance.reset();
      diagramInstance.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: bound });
      break;
  }
}