import * as d3 from 'd3';
import { Simulation, SimulationNodeDatum } from 'd3-force';
import * as R from 'ramda';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import MainChartWrapper, {
  MainChartWrapperProps,
} from 'src/components/Charts/MainChartWrapper';
import { lightColors } from 'src/styles';
import { RelwordsMapDataType } from 'src/types';
import { findMaxObj } from 'src/utils';

export type BubbleChartProps = {
  bubblesData: RelwordsMapDataType[];
  width: number;
  height: number;
} & MainChartWrapperProps;

type BubbleChartState = {
  data: { v: number }[];
};

export class UnWrappedBubbleChart extends React.Component<
  BubbleChartProps,
  BubbleChartState
> {
  public setBubblesDrawingData: { v: number }[];

  private simulation: Simulation<SimulationNodeDatum, undefined> | undefined;

  constructor(props: BubbleChartProps) {
    super(props);

    this.state = {
      data: [],
    };

    this.setBubblesDrawingData = R.map((v) => ({
      v: props.bubblesData[v as number].counts,
    }))(R.range(0, props.bubblesData.length));

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentDidMount() {
    this.animateBubbles();
  }

  animateBubbles = () => {
    const { bubblesData } = this.props;
    if (bubblesData.length > 0) {
      this.simulatePositions(this.setBubblesDrawingData);
    }
  };

  radiusScale = (value: d3.NumberValue) => {
    const { bubblesData } = this.props;
    const maxValue = findMaxObj(bubblesData, 'counts').counts;

    const fx = d3
      .scaleSqrt()
      .range([1, 55])
      .domain([0, maxValue / 2.5]);

    return fx(value);
  };

  simulatePositions = (data: { v: number }[]) => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data as SimulationNodeDatum[])
      .velocityDecay(0.05)
      .force('x', d3.forceX().strength(0.2))
      .force('y', d3.forceY().strength(0.2))
      .force(
        'collide',
        d3.forceCollide((d: SimulationNodeDatum) => {
          return this.radiusScale((d as { v: number }).v) + 2;
        })
      )
      .on('tick', () => {
        this.setState({ data });
      });
  };

  renderBubbles = (data: []) => {
    return data.map((item: { v: number; x: number; y: number }, index) => {
      const { width, height, bubblesData } = this.props;
      const fontSize = this.radiusScale(item.v) / 2.5;

      return (
        <g
          key={`g-${uuidv4()}`}
          transform={`translate(${width / 2 + item.x}, ${
            height / 2 + item.y
          })`}>
          <circle
            r={this.radiusScale(item.v)}
            fill={lightColors[bubblesData[index].color]}
          />
          <text
            dy="8"
            textAnchor="middle"
            fill={lightColors.Gray50}
            fontSize={`${fontSize}px`}
            fontWeight="bold">
            {bubblesData[index].name}
          </text>
        </g>
      );
    });
  };

  render() {
    const { width, height } = this.props;
    const { data } = this.state;

    return (
      <div>
        <svg width={width} height={height}>
          {this.renderBubbles(data as [])}
        </svg>
      </div>
    );
  }
}

export default MainChartWrapper(UnWrappedBubbleChart);
