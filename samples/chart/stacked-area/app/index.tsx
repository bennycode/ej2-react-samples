/**
 * Stacked Area sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme,
    Tooltip, DataLabel, DateTime, StackingAreaSeries, Legend, ILoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from './sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';

export let data1: any[] = [
    { x: new Date(2000, 0, 1), y: 0.61 },
    { x: new Date(2001, 0, 1), y: 0.81 }, { x: new Date(2002, 0, 1), y: 0.91 },
    { x: new Date(2003, 0, 1), y: 1 }, { x: new Date(2004, 0, 1), y: 1.19 },
    { x: new Date(2005, 0, 1), y: 1.47 }, { x: new Date(2006, 0, 1), y: 1.74 },
    { x: new Date(2007, 0, 1), y: 1.98 }, { x: new Date(2008, 0, 1), y: 1.99 },
    { x: new Date(2009, 0, 1), y: 1.70 }, { x: new Date(2010, 0, 1), y: 1.48 },
    { x: new Date(2011, 0, 1), y: 1.38 }, { x: new Date(2012, 0, 1), y: 1.66 },
    { x: new Date(2013, 0, 1), y: 1.66 }, { x: new Date(2014, 0, 1), y: 1.67 }
];
export let data2: any[] = [
    { x: new Date(2000, 0, 1), y: 0.03 },
    { x: new Date(2001, 0, 1), y: 0.05 }, { x: new Date(2002, 0, 1), y: 0.06 },
    { x: new Date(2003, 0, 1), y: 0.09 }, { x: new Date(2004, 0, 1), y: 0.14 },
    { x: new Date(2005, 0, 1), y: 0.20 }, { x: new Date(2006, 0, 1), y: 0.29 },
    { x: new Date(2007, 0, 1), y: 0.46 }, { x: new Date(2008, 0, 1), y: 0.64 },
    { x: new Date(2009, 0, 1), y: 0.75 }, { x: new Date(2010, 0, 1), y: 1.06 },
    { x: new Date(2011, 0, 1), y: 1.25 }, { x: new Date(2012, 0, 1), y: 1.55 },
    { x: new Date(2013, 0, 1), y: 1.55 }, { x: new Date(2014, 0, 1), y: 1.65 }
];
export let data3: any[] = [
    { x: new Date(2000, 0, 1), y: 0.48 },
    { x: new Date(2001, 0, 1), y: 0.53 }, { x: new Date(2002, 0, 1), y: 0.57 },
    { x: new Date(2003, 0, 1), y: 0.61 }, { x: new Date(2004, 0, 1), y: 0.63 },
    { x: new Date(2005, 0, 1), y: 0.64 }, { x: new Date(2006, 0, 1), y: 0.66 },
    { x: new Date(2007, 0, 1), y: 0.76 }, { x: new Date(2008, 0, 1), y: 0.77 },
    { x: new Date(2009, 0, 1), y: 0.55 }, { x: new Date(2010, 0, 1), y: 0.54 },
    { x: new Date(2011, 0, 1), y: 0.57 }, { x: new Date(2012, 0, 1), y: 0.61 },
    { x: new Date(2013, 0, 1), y: 0.67 }, { x: new Date(2014, 0, 1), y: 0.67 }
];
export let data4: any[] = [
    { x: new Date(2000, 0, 1), y: 0.23 },
    { x: new Date(2001, 0, 1), y: 0.17 }, { x: new Date(2002, 0, 1), y: 0.17 },
    { x: new Date(2003, 0, 1), y: 0.20 }, { x: new Date(2004, 0, 1), y: 0.23 },
    { x: new Date(2005, 0, 1), y: 0.36 }, { x: new Date(2006, 0, 1), y: 0.43 },
    { x: new Date(2007, 0, 1), y: 0.52 }, { x: new Date(2008, 0, 1), y: 0.72 },
    { x: new Date(2009, 0, 1), y: 1.29 }, { x: new Date(2010, 0, 1), y: 1.38 },
    { x: new Date(2011, 0, 1), y: 1.82 }, { x: new Date(2012, 0, 1), y: 2.16 },
    { x: new Date(2013, 0, 1), y: 2.51 }, { x: new Date(2014, 0, 1), y: 2.61 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedArea extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            intervalType: 'Years',
                            majorGridLines: { width: 0 },
                            labelFormat: 'y',
                            edgeLabelPlacement: 'Shift'
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Spends',
                            minimum: 0,
                            maximum: 7,
                            interval: 1,
                            majorGridLines: { width: 0 },
                            labelFormat: '{value}B',
                            opposedPosition: true
                        }}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        title='Trend in Sales of Ethical Produce' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[StackingAreaSeries, Legend, DateTime]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Organic' type='StackingArea'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Fair-trade' type='StackingArea'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Veg Alternatives' type='StackingArea'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data4} xName='x' yName='y' name='Others' type='StackingArea'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.gov.uk/" target='_blank'>www.gov.uk</a>
                    </div>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
ReactDOM.render(<StackedArea />, document.getElementById('sample'));