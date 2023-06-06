import axios from "axios"
import { apiUrl } from "../../services/apiUrl";

export default function DeleteTask ({taskId}) {
    function handleDelete () {
        const url = apiUrl + "task_list/delete/" + taskId;
        let token = localStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.delete(url, config)
            .then(res => {
                location.reload()
            });
    }

    return(
        <div>
            <button onClick={handleDelete}><i className='bx bxs-trash action action-delete'></i></button>
        </div>
    )
}