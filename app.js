import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;
app.use(express.static("public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse application/x-www-form-urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/SE17", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define user schema
const UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  username: String,
  password: String,
  confirmPassword: String,
  courses: [String],
});
// Define user model
const User = mongoose.model("User", UserSchema);

// Serve home.html
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Serve register.html
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Serve course.html
app.get("/courses", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "courses.html"));
});


// Serve login.html
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// serve payment.html
for (let i = 1; i <= 18; i++) {
  app.get("/payment" + i, function (req, res) {
    res.sendFile(
      path.join(__dirname, "public", "payment", "payment" + i + ".html")
    );
  });
}

app.use(express.static(path.join(__dirname, 'public')));

//serve lecture.html
for (let i = 1; i <= 18; i++) {
  app.get("/lecture" + i, function (req, res) {
    res.sendFile(
      path.join(__dirname, "public", "lecture", "lecture" + i + ".html")
    );
  });
}

//serve content.html
for (let i = 1; i <= 18; i++) {
  app.get("/content" + i, function (req, res) {
    res.sendFile(
      path.join(__dirname, "public", "content", "content" + i + ".html")
    );
  });
}


// serve exams
app.use(
  "/english",
  express.static(path.join(__dirname, "public", "exams", "english"))
);
app.use(
  "/german",
  express.static(path.join(__dirname, "public", "exams", "german"))
);
app.use("/cpp", express.static(path.join(__dirname, "public", "exams", "cpp")));
app.use(
  "/java",
  express.static(path.join(__dirname, "public", "exams", "java"))
);
app.use(
  "/csharp",
  express.static(path.join(__dirname, "public", "exams", "csharp"))
);
app.use(
  "/python",
  express.static(path.join(__dirname, "public", "exams", "python"))
);
app.use(
  "/masscommunication",
  express.static(path.join(__dirname, "public", "exams", "mass communication"))
);
app.use(
  "/digitalmarketing",
  express.static(path.join(__dirname, "public", "exams", "digital marketing"))
);
app.use(
  "/machinelearning",
  express.static(path.join(__dirname, "public", "exams", "machine learning"))
);
app.use(
  "/htmlandcss",
  express.static(path.join(__dirname, "public", "exams", "htmlandcss"))
);
app.use(
  "/react",
  express.static(path.join(__dirname, "public", "exams", "react"))
);
app.use(
  "/python2",
  express.static(path.join(__dirname, "public", "exams", "python2"))
);
app.use(
  "/english2",
  express.static(path.join(__dirname, "public", "exams", "english2"))
);
app.use(
  "/uiandux",
  express.static(path.join(__dirname, "public", "exams", "uiandux"))
);
app.use(
  "/flutter",
  express.static(path.join(__dirname, "public", "exams", "flutter"))
);
app.use(
  "/javascript",
  express.static(path.join(__dirname, "public", "exams", "javascript"))
);
app.use(
  "/nodejs",
  express.static(path.join(__dirname, "public", "exams", "nodejs"))
);
app.use(
  "/graphicdesign",
  express.static(path.join(__dirname, "public", "exams", "graphicdesign"))
);

// Handle form submission from register.html
app.post("/register", async (req, res) => {
  try {
    const { fname, lname, email, username, password, confirmpassword } =
      req.body;

    // Check if all fields are provided
    if (
      !fname ||
      !lname ||
      !email ||
      !username ||
      !password ||
      !confirmpassword
    )
      if (password !== confirmpassword) {
        // Check if password and confirmpassword match
        return res.status(400).send("Passwords do not match!");
      }

    // Find user
    const findUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (findUser) {
      return res.status(400).send("Email or username already exists!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      fname,
      lname,
      email,
      username,
      password: hashedPassword,
    });
    await user.save();

    console.log(user);

    res.cookie("registered", "true");
    res.redirect("/login");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).send("Please enter your username and password");
  }

  const findUser = await User.findOne({ username: username });

  if (!findUser) {
    return res.status(400).send("Wrong username or password !");
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (!passwordMatch) {
    return res.render("login", { errorMsg: "Wrong username or password !" });
  }

  if (passwordMatch) {
    res.cookie("loggedIn", "true");
    res.redirect("/home");
  }
});

// Handle purchase request for payment 1
app.post("/purchase1", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content1");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// Handle purchase request for payment 2 to 18
app.post("/purchase2", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content2");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 3 to 18
app.post("/purchase3", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content3");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 4 to 18
app.post("/purchase4", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content4");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 5 to 18
app.post("/purchase5", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content5");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 6 to 18
app.post("/purchase6", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content6");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 7 to 18
app.post("/purchase7", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content7");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 8 to 18
app.post("/purchase8", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content8");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 9 to 18
app.post("/purchase9", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content9");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 10 to 18
app.post("/purchase10", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content10");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 11 to 18
app.post("/purchase11", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content11");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 12 to 18
app.post("/purchase12", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content12");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 13 to 18
app.post("/purchase13", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content13");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 14 to 18
app.post("/purchase14", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content14");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 15 to 18
app.post("/purchase15", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content15");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 16 to 18
app.post("/purchase16", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content16");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 17 to 18
app.post("/purchase17", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content17");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Handle purchase request for payment 18
app.post("/purchase18", async (req, res) => {
  try {
    const { fname, lname, email, username, password, course } = req.body; // Retrieve the course name from the request body

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user's password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Update the user's courses with the purchased course
    user.courses.push(course); // Add the purchased course to the user's courses array
    await user.save();

    // Redirect to /lecture1 after successful purchase
    res.redirect("/content18");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(port, () => {
  console.log("Server is started on port 3000");
});
