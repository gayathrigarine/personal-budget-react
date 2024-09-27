import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import * as d3 from 'd3'

Chart.register(ArcElement, Tooltip, Legend);

function HomePage() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Budget Distribution',
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#4bc0c0',
          '#9966ff',
          '#c9cbcf',
        ],
      },
    ],
  });

  const [d3Data, setD3Data] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/budget').then((res) => {
      const budgetItems = res.data.myBudget;

      const labels = budgetItems.map((item) => item.title);
      const data = budgetItems.map((item) => item.budget);


      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#4bc0c0',
              '#9966ff',
              '#c9cbcf',
            ],
          },
        ],
      });

    
      setD3Data(budgetItems);
      console.log("message",d3Data);
      createD3Chart(budgetItems);
    });
  },[]);

  const createD3Chart = (data) => {
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    d3.select('#d3ChartSvg').selectAll('*').remove(); 
 

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none');

    const svg = d3
      .select('#d3ChartSvg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.budget);
    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = svg
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.title))
      .on('mouseover', (event, d) => {
        const percentage = (
          (d.data.budget / d3.sum(data, (d) => d.budget)) *
          100
        ).toFixed(1);
        tooltip
          .style('visibility', 'visible')
          .text(`${d.data.title}: $${d.data.budget} (${percentage}%)`);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', () => tooltip.style('visibility', 'hidden'));

    d3.select(window).on('resize', () => tooltip.remove());

    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', '#000') 
      .text((d) => d.data.title);
  };
  return (
    <main className='center' id='main'>
      <div className='page-area'>
        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h1>Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h1>Chart.js Pie Chart</h1>
          <canvas id='myChart' width='300' height='300'></canvas>
          <Pie data={chartData} />
        </article>

        <article>
          <h1>D3.js Pie Chart</h1>
          <svg id='d3ChartSvg' width='300' height='100'></svg>
        </article>
      </div>
    </main>
  );
}

export default HomePage;
