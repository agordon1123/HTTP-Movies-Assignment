import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import Axios from 'axios';

// {
//     id: 5,
//     title: 'Tombstone',
//     director: 'George P. Cosmatos',
//     metascore: 89,
//     stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
//   }


const UpdateForm = props => {

    const initialValue = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: ''
    }

    const [targetEdit, setTargetEdit] = useState(initialValue)
    console.log(targetEdit)

    useEffect(() => {
        const id = props.match.params.id;
        console.log(id);
        const movieInArr = props.movies.find(mov => `${mov.id}` === id);
        console.log(movieInArr);
        if(movieInArr) setTargetEdit(movieInArr);
    }, [props.match.params]);
    
    console.log(props);
    return (
        <div>
            <p>UpdateForm</p>
            <Form>
                <Field
                    type='text'
                    name='title'
                    placeholder={targetEdit.title}
                />
                <Field
                    type='text'
                    name='director'
                    placeholder={targetEdit.director}
                />
                <Field
                    type='text' 
                    name='metascore'
                    placeholder={targetEdit.metascore}
                />
                <Field
                    type='text' 
                    name='stars'
                    placeholder={targetEdit.stars}
                />
                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

const UpdateFormik = withFormik({
    mapPropsToValues({ id, title, director, metascore, stars, ...props }) {
        console.log(props)
        return {
            id: props.match.params.id,
            title: title || '',
            director: director || '',
            metascore: metascore || '',
            stars: stars || ''
        }
    },

    handleSubmit(values, { props }) {
        console.log(props)
        console.log(values)
        console.log(this.initialValue)
        Axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, values)
            .then(res => {
                console.log(res)
                props.setMovies(...props.movies, res.data)
            })
            .catch(err => console.log(err))
    }
    
})(UpdateForm)

export default UpdateFormik;
