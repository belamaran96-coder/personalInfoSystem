use PersonalInfoSystem;

// --- 1. User Registration Function ---
var registerUser = function(username, password, name) {
    if (db.users.findOne({ username: username })) {
        return { success: false, message: "Username already exists." };
    }
    db.users.insertOne({
        username: username,
        password: password,
        name: name,
        created_at: new Date()
    });
    return { success: true, message: "Registration successful." };
};

// --- 2. User Login Function ---
var loginUser = function(username, password) {
    var user = db.users.findOne({ username: username, password: password });
    if (user) {
        // Returns the user's MongoDB ID and name for session simulation
        return { success: true, userId: user._id.toHexString(), name: user.name };
    } else {
        return { success: false, message: "Invalid credentials." };
    }
};

// --- 3. Save Personal Info Function ---
// --- 3. Save Personal Info (4-5 Pages Data) Function (SIMPLIFIED) ---
var savePersonalInfo = function(userId, data) {
    // This simplified function avoids the "require('bson')" error.

    // Save/Update the record in the 'personal_records' collection
    db.personal_records.updateOne(
        // We use the string userId directly for query
        { userId: userId }, 
        { 
            $set: { 
                date_saved: new Date(),
                ...data,
                userId: userId // Ensure userId is explicitly set
            }
        },
        { upsert: true }
    );

    return { success: true, message: "Personal information saved/updated successfully (Simplified Logic)!" };
};