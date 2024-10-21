import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleSignup, SubtitleSignup, LoginText, Wrapper, WarningSignup } from './styles';

const SignUp = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}`);
            
            if(data.length && data[0].id){
                alert('Usuário já cadastrado')
                return
            }

            const {status} = await api.post(`/users`, {
                "name": formData.fullname,
                "email": formData.email,
                "senha": formData.password
            });
            
            if(status === 201){
                navigate('/feed') 
                return
            }
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleSignup>Comece agora grátis</TitleSignup>
                <SubtitleSignup>Crie sua conta e make the change._</SubtitleSignup>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdPerson style={{color: '#8647AD'}} />} name="fullname"  control={control} />
                    {errors.fullname && <span>Nome completo é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail style={{color: '#8647AD'}} />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Password" leftIcon={<MdLock style={{color: '#8647AD'}} />}  name="password" control={control} />
                    {errors.password && <span>Password é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <WarningSignup>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</WarningSignup>

                <LoginText>
                    <p>Já tenho uma conta. </p>
                    <a href="/login" >Fazer login</a>
                </LoginText>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { SignUp }