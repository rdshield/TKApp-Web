<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>AWS Cognito authentication example</title>
  <link rel="stylesheet" media="all" href="/css/login/index.css">
  <link rel="stylesheet" media="all" href="/css/login/Control.css">
  <link rel="stylesheet" media="all" href="/css/login/Alert.css">
  <link rel="stylesheet" media="all" href="/css/login/Button.css">
  <link rel="stylesheet" media="all" href="/css/login/Well.css">
</head>
<body>
  <?php include("./php/part/templates.php"); ?>
  <!-- Root component -->
  <div id="root"></div>
  <!-- Scripts -->
  <script src="/js/login/lib/aws-cognito-sdk.min.js"></script>
  <script src="/js/login/lib/amazon-cognito-identity.min.js"></script>
  <script src="/js/login/config.js"></script>
  <script src="/js/login/utils.js"></script>
  <script src="/js/login/EventEmmiter.js"></script>
  <script src="/js/login/Cognito.js"></script>
  <script src="/js/login/LoginForm.js"></script>
  <script src="/js/login/ConfirmForm.js"></script>
  <script src="/js/login/SignupForm.js"></script>
  <script src="/js/login/Welcome.js"></script>
  <script src="/js/login/index.js"></script>
</body>
</html>
