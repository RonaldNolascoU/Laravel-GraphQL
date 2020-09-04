<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>test</title>
</head>

<body>
    <!-- <form action="/test" method="POST" enctype="multipart/form-data">
@csrf
        <input type="text" name="title">
        <input type="text" name="content">
        <input type="file" name="image">
        <button type="submit">upload</button> 
</form>-->

    <div class="container"></div>
    <form action="/test" method="POST" enctype="multipart/form-data" class="border border-light p-5">
    @csrf
        <p class="h4 mb-4 text-center">Create Post</p>

        <input name="title" type="text" id="" class="form-control mb-4" placeholder="Title">

        <input name="content" type="text" id="" class="form-control mb-4" placeholder="Content">

        <input type="file" class=" mb-4 form-control-file" name="image">

        <div class="d-flex justify-content-between">
            <div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                    <label class="custom-control-label" for="defaultLoginFormRemember">Term & Conditions</label>
                </div>
            </div>
            <div>
                <a href="">Facts</a>
            </div>
        </div>

        <button class="btn btn-info btn-block my-4" type="submit">Create</button>

        <div class="text-center">
            <p>Not a member?
                <a href="">Register</a>
            </p>

            <p>or sign in with:</p>
            <a type="button" class="light-blue-text mx-2">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a type="button" class="light-blue-text mx-2">
                <i class="fab fa-twitter"></i>
            </a>
            <a type="button" class="light-blue-text mx-2">
                <i class="fab fa-linkedin-in"></i>
            </a>
            <a type="button" class="light-blue-text mx-2">
                <i class="fab fa-github"></i>
            </a>
        </div>
    </form>
    </div>
</body>

</html>
