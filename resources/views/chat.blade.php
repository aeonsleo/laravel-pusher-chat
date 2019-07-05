<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .list-group {
            overflow-y: auto;
            max-height: 200px;
        }
        #app {
            margin-top: 60px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row" id="app">
            <div class="col-md-6 offset-2">
                <li class="list-group-item active">Chat Room</li>
                <ul class="list-group" v-chat-scroll>
                    <message v-for="(value,index) in chat.messages" :key="value.index" :color="chat.color[index]" :user="chat.users[index]">
                        @{{ value }}
                    </message>
                </ul>
                <input v-model="message" @keyup.enter="send" type="text" class="form-control" placeholder="Type your message here ..">
            </div>
        </div>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>