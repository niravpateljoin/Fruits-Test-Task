<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fruit List</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        orangeFruit: '#ff6600',
                    }
                }
            }
        }
    </script>
    @viteReactRefresh
    @vite('resources/js/app.jsx') {{-- or app.js depending on your entry file --}}
</head>
<body class="bg-gray-100">
    <div id="app"></div>
</body>
</html>

