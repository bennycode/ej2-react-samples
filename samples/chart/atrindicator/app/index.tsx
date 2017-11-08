/**
 * ATR Indicator Sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject,
    CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, StripLinesDirective, StripLineDirective,
    Crosshair, LineSeries, AtrIndicator, StripLine, ChartTheme, IndicatorsDirective, IndicatorDirective
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { chartData } from '../financial-data';
import { SampleBase } from './sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * ATR sample
 */
export class ATR extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            intervalType: 'Months',
                            majorGridLines: { width: 0 },
                            skeleton: 'yMd',
                            zoomFactor: 0.2, zoomPosition: 0.6,
                            crosshairTooltip: { enable: true },
                        }}
                        primaryYAxis={{
                            title: 'Price',
                            labelFormat: '${value}',
                            minimum: 50, maximum: 170,
                            interval: 30, rowIndex: 1,
                            plotOffset: 25,
                            majorGridLines: { width: 1 }, opposedPosition: true, lineStyle: { width: 0 }
                        }}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X' }}
                        title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, StripLine, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
                            AtrIndicator]} />
                        <RowsDirective>
                            <RowDirective height={'40%'}>
                            </RowDirective>
                            <RowDirective height={'60%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective name='secondary'
                                opposedPosition={true} rowIndex={0}
                                majorGridLines={{ width: 0 }} lineStyle={{ width: 0 }} majorTickLines={{ width: 0 }}
                                maximum={14} minimum={0} interval={7} title={'ATR'}>
                                <StripLinesDirective>
                                    <StripLineDirective start={0} end={14} text='' color='#6063ff' visible={true}
                                        opacity={0.1} zIndex='Behind'>
                                    </StripLineDirective>
                                </StripLinesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} width={2}
                                xName='x' yName='y' low='low' high='high' close='close' volume='volume' open='open'
                                name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                type='Candle' animation={{ enable: true }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective yAxisName='secondary' type='Atr' fill='#6063ff' seriesName='Apple Inc' period={3}
                                animation={{ enable: true }}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}

ReactDOM.render(<ATR />, document.getElementById('sample'));