import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";

export default function FormPage() {
    const navigate= useNavigate();
    return <Form onSuccess={() => navigate('/', { replace: true})} />;}