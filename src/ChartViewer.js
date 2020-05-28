import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const schemaFetch = [{
    "name": "Time",
    "type": "date",
    "format": "%-m/%-d/%Y"
}, {
    "name": "KD ratio",
    "type": "number"
}, {
    "name": "Practice",
    "type": "number"
}];

const dataSource = {
    chart: {},
    caption: {
        text: "Gameplay stats"
    },
    yaxis: [
        {
            plot: {
                value: "KD ratio",
                type: "area"
            },
            title: "KD ratio"
        },
        
        {
            plot: {
                value: "Practice",
                type: "column"
            },
            title: "Practice"
        }
    ]
};

class ChartViewer extends React.Component {
    constructor(props) {
        super(props);
        this.onFetchData = this.onFetchData.bind(this);
        this.state = {
            timeseriesDs: {
                type: "timeseries",
                renderAt: "container",
                width: "600",
                height: "400",
                dataSource
            }
        };
    }

    componentDidUpdate(prevProps) {
        console.log('Component updated');
        if(this.props.values && prevProps.values && this.props.values.length !== prevProps.values.length) {
            // console.log('Component updated')
            this.onFetchData(this.props.values);
        }
    }

    componentDidMount() {
        // this.onFetchData();
    }

    onFetchData(values) {
        
        Promise.all([values, schemaFetch]).then(res => {
            const data = res[0];
            const schema = res[1];
            const fusionTable = new FusionCharts.DataStore().createDataTable(
                data,
                schema
            );
            const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
            timeseriesDs.dataSource.data = fusionTable;
            this.setState({
                timeseriesDs
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.timeseriesDs.dataSource.data ? (
                    <ReactFC {...this.state.timeseriesDs} />
                ) : (
                        "loading"
                    )}
            </div>
        );
    }
}

export default ChartViewer;