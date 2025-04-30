
<?php
session_start();
include("hospitaldb.php");

$message = '';
$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email'])) {
        // Step 1: Verify email
        $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
        
        // Check if email exists
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($row = mysqli_fetch_assoc($result)) {
            // Generate a unique token
            $token = bin2hex(random_bytes(32));
            $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
            
            // Store token in database
            $update_sql = "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?";
            $update_stmt = mysqli_prepare($conn, $update_sql);
            mysqli_stmt_bind_param($update_stmt, "sss", $token, $expires, $email);
            mysqli_stmt_execute($update_stmt);
            
            // Send email with reset link (in a real application)
            $reset_link = "http://" . $_SERVER['HTTP_HOST'] . "/reset_password.php?token=" . $token;
            
            // For demo purposes, we'll just show the link
            $message = "Password reset link has been generated. Click the link below to reset your password:<br>
                       <a href='$reset_link'>$reset_link</a>";
        } else {
            $error = "Email not found in our system.";
        }
    } elseif (isset($_POST['new_password'])) {
        // Step 2: Reset password
        $token = $_POST['token'];
        $new_password = $_POST['new_password'];
        $confirm_password = $_POST['confirm_password'];
        
        if ($new_password !== $confirm_password) {
            $error = "Passwords do not match.";
        } else {
            // Verify token and update password
            $sql = "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $token);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            
            if ($row = mysqli_fetch_assoc($result)) {
                $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
                
                $update_sql = "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?";
                $update_stmt = mysqli_prepare($conn, $update_sql);
                mysqli_stmt_bind_param($update_stmt, "ss", $hashed_password, $token);
                mysqli_stmt_execute($update_stmt);
                
                $message = "Password has been reset successfully. You can now login with your new password.";
            } else {
                $error = "Invalid or expired reset link.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - Apollo Hospitals</title>
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

        .container {
            background: rgba(255, 255, 255, 0.95);
            padding: 2.5rem 3rem;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 420px;
            position: relative;
            z-index: 1;
        }

        .logo {
            text-align: center;
            margin-bottom: 2rem;
        }

        .logo img {
            width: 100px;
            height: auto;
        }

        h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #2d3748;
        }

        .input-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .input-group input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .input-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .btn {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 12px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            color: white;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .message {
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 12px;
            background-color: #f0fff4;
            color: #2f855a;
            text-align: center;
        }

        .error {
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 12px;
            background-color: #fff5f5;
            color: #c53030;
            text-align: center;
        }

        .back-link {
            text-align: center;
            margin-top: 1.5rem;
        }

        .back-link a {
            color: #667eea;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="logo.png" alt="Apollo Hospitals Logo">
        </div>
        
        <?php if (!empty($error)): ?>
            <div class="error">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($message)): ?>
            <div class="message">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>

        <?php if (isset($_GET['token'])): ?>
            <!-- Reset Password Form -->
            <h2>Reset Your Password</h2>
            <form method="post">
                <input type="hidden" name="token" value="<?php echo htmlspecialchars($_GET['token']); ?>">
                <div class="input-group">
                    <input type="password" name="new_password" placeholder="New Password" required>
                </div>
                <div class="input-group">
                    <input type="password" name="confirm_password" placeholder="Confirm New Password" required>
                </div>
                <button type="submit" class="btn">Reset Password</button>
            </form>
        <?php else: ?>
            <!-- Forgot Password Form -->
            <h2>Forgot Password</h2>
            <form method="post">
                <div class="input-group">
                    <input type="email" name="email" placeholder="Enter your email" required>
                </div>
                <button type="submit" class="btn">Send Reset Link</button>
            </form>
        <?php endif; ?>

        <div class="back-link">
            <a href="login.php">Back to Login</a>
        </div>
    </div>
</body>
</html> 
