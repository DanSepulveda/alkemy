import Swal from 'sweetalert2'

const message = (icon, title, position = 'top-end') => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    return (
        Toast.fire({
            icon: icon,
            title: title
        })
    )
}

export default message