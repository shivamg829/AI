<?php
session_start();
include("hospitaldb.php");

$error_message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Username = filter_input(INPUT_POST, "Username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

    // Check if user exists
    $sql = "SELECT * FROM users WHERE user = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $Username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        if (password_verify($password, $row["password"])) {
            $_SESSION["Username"] = $Username;
            $_SESSION["login_success"] = true;
            header("Location: main.php");
            exit();
        } else {
            $error_message = 'Incorrect password.';
        }
    } else {
        $error_message = 'User not found. Please sign up.';
    }
    mysqli_stmt_close($stmt);
}
mysqli_close($conn);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Apollo Hospitals</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
        }

        body::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%);
            transform: translate(-50%, -50%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .container {
            background: rgba(255, 255, 255, 0.95);
            padding: 2.5rem 3rem;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 420px;
            position: relative;
            z-index: 1;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .container:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .logo {
            text-align: center;
            margin-bottom: 2rem;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .logo img {
            width: 100px;
            height: auto;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }

        .logo-text {
            display: block;
            font-size: 1.4rem;
            color: #2d3748;
            margin-top: 0.8rem;
            font-weight: 600;
            letter-spacing: 1px;
        }

        .container h2 {
            text-align: center;
            margin-bottom: 2.5rem;
            color: #2d3748;
            font-size: 2rem;
            font-weight: 600;
            position: relative;
        }

        .container h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 3px;
        }

        .input-group {
            margin-bottom: 1.8rem;
            position: relative;
        }

        .input-group input {
            width: 100%;
            padding: 1rem 1.2rem 1rem 3rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #f8fafc;
            color: #2d3748;
        }

        .input-group i {
            position: absolute;
            left: 1.2rem;
            top: 50%;
            transform: translateY(-50%);
            color: #718096;
            transition: all 0.3s ease;
        }

        .input-group input:focus + i {
            color: #667eea;
        }

        .input-group input:focus {
            outline: none;
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .input-group label {
            position: absolute;
            left: 3rem;
            top: 50%;
            transform: translateY(-50%);
            color: #718096;
            pointer-events: none;
            transition: 0.3s;
            font-size: 0.95rem;
        }

        .input-group input:focus + i + label,
        .input-group input:not(:placeholder-shown) + i + label {
            top: -10px;
            font-size: 0.8rem;
            background: white;
            padding: 0 5px;
            color: #667eea;
            left: 1.2rem;
        }

        .btn {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .login-btn {
            background: linear-gradient(90deg, #667eea, #764ba2);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .login-btn:active {
            transform: translateY(0);
        }

        .toggle-link {
            text-align: center;
            margin-top: 1.5rem;
        }

        .toggle-link a {
            color: #667eea;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
        }

        .toggle-link a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #667eea;
            transition: width 0.3s ease;
        }

        .toggle-link a:hover::after {
            width: 100%;
        }

        .alert {
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 12px;
            background-color: #fff5f5;
            color: #c53030;
            text-align: center;
            font-size: 0.9rem;
            border: 1px solid #fed7d7;
            animation: shake 0.5s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .alert i {
            font-size: 1.2rem;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        @media (max-width: 480px) {
            .container {
                margin: 1.5rem;
                padding: 2rem;
            }
        }

        .floating-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }

        .shape {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 15s infinite linear;
        }

        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-100vh) rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="floating-shapes">
        <div class="shape" style="width: 100px; height: 100px; left: 10%; animation-duration: 20s;"></div>
        <div class="shape" style="width: 150px; height: 150px; left: 30%; animation-duration: 25s; animation-delay: -5s;"></div>
        <div class="shape" style="width: 80px; height: 80px; left: 50%; animation-duration: 18s; animation-delay: -2s;"></div>
        <div class="shape" style="width: 120px; height: 120px; left: 70%; animation-duration: 22s; animation-delay: -7s;"></div>
        <div class="shape" style="width: 90px; height: 90px; left: 90%; animation-duration: 19s; animation-delay: -3s;"></div>
    </div>
    <div class="container">
        <div class="logo">
            <img src="logo.png" alt="Apollo Hospitals Logo">
            <span class="logo-text">Apollo Hospitals</span>
        </div>
        <div id="loginSection">
            <h2>Welcome Back</h2>
            <?php if (!empty($error_message)): ?>
                <div class="alert">
                    <i class="fas fa-exclamation-circle"></i>
                    <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>
            <form id="loginForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                <div class="input-group">
                    <input type="text" name="Username" id="loginEmail" placeholder=" " required>
                    <i class="fas fa-user"></i>
                    <label for="loginEmail">Username</label>
                </div>
                <div class="input-group">
                    <input type="password" name="password" id="loginPassword" placeholder=" " required>
                    <i class="fas fa-lock"></i>
                    <label for="loginPassword">Password</label>
                </div>
                <button type="submit" class="btn login-btn">Login</button>
            </form>
            <div class="toggle-link">
                <a href="Reg.php">Don't have an account? Sign up</a>
                <br>
                <a href="forgot_password.php" style="margin-top: 10px; display: inline-block;">Forgot Password?</a>
            </div>
        </div>
    </div>
</body>
</html>

<?php
// Check if login was successful and show alert
if (isset($_SESSION["login_success"]) && $_SESSION["login_success"] === true) {
    unset($_SESSION["login_success"]); // Clear the session variable
    echo "<script>
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome to Apollo Hospitals',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    </script>";
}
?>
