<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test</title>
</head>
<body>
    <form action="/test" method="POST" enctype="multipart/form-data">
    @csrf
        <input type="text" name="title">
        <input type="text" name="content">
        <input type="file" name="image">
        <button type="submit">upload</button>
    </form>
</body>
</html>