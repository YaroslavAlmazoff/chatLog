import api from "../../api/auth"
class Functions {
    async showLikers(request, type, setLikers, id) {
        
    }
    async updateLikers(request, type, setLikers, params) {
        this.showLikers(request, type, setLikers, params)
    }
}

export default new Functions()