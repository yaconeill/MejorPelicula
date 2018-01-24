$(document).ready(function () {
    isLogin();
    var selectedFilm = localStorage.getItem('selectedFilm');
    var filmCatalog = JSON.parse(localStorage.getItem('rating'));

    var $movieDetails = $('#movieDetails');
    var tmpFilm;
    filmCatalog.find(o => {
        if (o.id === selectedFilm)
            tmpFilm = o;
    });
    var dataGraphic = [['Rate', 'Películas mejor valoradas']];
    filmCatalog.forEach(function (e) {
        dataGraphic.push([e.name, e.rate]);
    });

    // #region - gráfico donut
    $('#donut').change(function () {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(dataGraphic);

            var options = {
                title: 'Películas mejor valoradas',
                pieHole: 0.4,
            };

            var chart = new google.visualization.PieChart(document.getElementById('graphic'));
            chart.draw(data, options);
        }
    });

    // #endregion

    // #region - diagrama de barras
    $('#bar').change(function () {
        google.charts.load('current', { 'packages': ['bar'] });
        google.charts.setOnLoadCallback(drawStuff);

        function drawStuff() {
            var data = new google.visualization.arrayToDataTable(dataGraphic);

            var options = {
                // width: 800,
                legend: { position: 'none' },
                chart: {
                    title: 'Películas mejor valoradas',
                    subtitle: 'popularidad por porcentaje'
                },
                axes: {
                    x: {
                        0: { side: 'top', label: 'Resultado de la votación' } // Top x-axis.
                    }
                },
                bar: { groupWidth: "90%" }
            };

            var chart = new google.charts.Bar(document.getElementById('graphic'));
            // Convert the Classic options to Material options.
            chart.draw(data, google.charts.Bar.convertOptions(options));
        };
    });
    // #endregion

    // #region - diagrama de tarta
    $('#pie').change(function () {
        // function drawChart() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(dataGraphic);

            var options = {
                title: 'My Daily Activities',
                is3D: true,
            };

            var chart = new google.visualization.PieChart(document.getElementById('graphic'));
            chart.draw(data, options);
        }
        // }
        // $(window).resize(function () {
        //     drawChart();
        // });
    });
    // #endregion
    $('#logout').click(function () {
        localStorage.removeItem('currentUser');
        location.reload();
    });
});