<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form class="row g-3 align-items-center justify-content-center mb-3">
            <div class="col-auto">
                <label for="num_registros" class="form-label">Mostrar:</label>
            </div>
            <div class="col-auto">
                <select name="num_registros" id="num_registros" class="form-select">
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="col-auto">
                <label for="campo" class="form-label">Buscar:</label>
            </div>
            <div class="col-auto">
                <input type="text" name="campo" id="campo" class="form-control" required>
            </div>
        </form>

        <div class="table-responsive">
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>no_emp</th>
                        <th>fecha_nacimiento</th>
                        <th>nombre</th>
                        <th>apellido</th>
                        <th>genero</th>
                        <th>fecha_ingreso</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody id="content"></tbody>
            </table>
        </div>

        <div class="row align-items-center mt-3">
            <div class="col-md-6">
                <label id="lbl-total" class="form-label"></label>
            </div>
            <div class="col-md-6 text-end" id="nav-paginacion"></div>
        </div>
    </div>

    <script>
        let paginaActual = 1;
        getData(paginaActual);
        window.addEventListener('DOMContentLoaded', getData);

        document.getElementById('campo').addEventListener('keyup', function(){ 
            getData(1);
        }, false);
        document.getElementById('num_registros').addEventListener('change', function(){ 
            getData(paginaActual);
        }, false);

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
        });

        function getData(pagina){
            let input = document.getElementById('campo').value;
            let content = document.getElementById('content');
            let num_registros = document.getElementById('num_registros').value;
            
            if (pagina != null) {
                paginaActual = pagina;
            }

            let url = 'load.php';
            let formData = new FormData();
            formData.append('campo', input);
            formData.append('registros', num_registros);
            formData.append('pagina', pagina);

            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                content.innerHTML = data.data;
                document.getElementById('lbl-total').innerHTML = 'Mostrando ' + data.totalFiltro + ' de ' + data.totalRegistros + ' registros';
                document.getElementById('nav-paginacion').innerHTML = data.paginacion;
            })
            .catch(err => {
                content.innerHTML = '<tr><td colspan="8">Error al cargar datos.</td></tr>';
                console.log('Error:', err);
            });
        }
    </script>
</body>
</html>