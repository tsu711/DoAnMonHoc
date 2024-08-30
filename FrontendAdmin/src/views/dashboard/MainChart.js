import React, { useEffect, useRef, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { getAllOrders } from '../../api/apiService'

const MainChart = () => {
  const chartRef = useRef(null)
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    getAllOrders('orders')
      .then((response) => {
        setOrderData(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch orders data:', error)
      })
  }, [])

  const getOrderCountsByMonth = () => {
    const orderCounts = new Array(12).fill(0)
    orderData.forEach((order) => {
      const createdAt = new Date(order.createdAt)
      const month = createdAt.getMonth()
      orderCounts[month]++
    })

    return orderCounts
  }

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
          ],
          datasets: [
            {
              label: 'Number of Orders',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: getOrderCountsByMonth(), // Use api đếm order
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: Math.max(...getOrderCountsByMonth()), // Set value tối đa dựa theo quantiy order
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(Math.max(...getOrderCountsByMonth()) / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
