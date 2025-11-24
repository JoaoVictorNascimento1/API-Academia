import Admin from '../models/admin.model.js';

class AdminRepository {
    static async findMainAdmin() {
        return await Admin.findOne();
    }
    
    static async findByEmail(email) {
        return await Admin.findOne({ email: email });
    }
}

export default AdminRepository;