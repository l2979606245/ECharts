            var chartWheather = (w) => {
                // 基于准备好的 dom，初始化 echarts 实例
                var element = document.querySelector('#main')
                var myChart = echarts.init(element)

                var a = w['HeWeather6'][0]
                var location = a['basic']['location']
                var arr = a['daily_forecast']
                var date = []
                var maxTmp = []
                var minTmp = []
                for (var i of arr) {
                    date.push(i['date'])
                    maxTmp.push(i['tmp_max'])
                    minTmp.push(i['tmp_min'])
                }


                // 指定图表的配置项和数据(ECharts规定)
                var option = {
                    title: {
                        text: `${location}未来三天气温变化`,
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温','最低气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: true,
                        data: date,
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name:'最高气温',
                            type:'line',
                            data: maxTmp,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'最低气温',
                            type:'line',
                            data: minTmp,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                ]
                            }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option)
            }
            var fetchWeather = (callback) => {
                var url = 'https://free-api.heweather.com/s6/weather/forecast?location=哈尔滨&key=4d9894b3a8204d3bb9296232c7251232'
                var request = {
                    method: 'GET',
                    url: url,
                    callback: callback,
                }
                return ajax(request)
            }
            
            var __main = () => {
                var callback = (data) => {
                    var data = JSON.parse(data)
                    chartWheather(data)
                }
                fetchWeather(callback)
            }
            __main()