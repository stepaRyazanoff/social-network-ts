import {FC} from 'react'
import {Field, Form, Formik} from 'formik'
import {Filter} from '../../redux/usersReducer'

interface Props {
    onFilterChange: (values: Filter) => void
}

interface Values {
    term: string
    friend: 'true' | 'false' | 'null'
}

const UsersSearchForm: FC<Props> = ({onFilterChange}) => {
    const handleSubmit =
        (values: Values, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
            const filter: Filter = {
                term: values.term,
                friend: values.friend === 'null' ? null : values.friend === 'true'
            }
            onFilterChange(filter)
            setSubmitting(false)
        }

    return (
        <div>
            <Formik initialValues={{term: '', friend: 'null'}} onSubmit={handleSubmit}>
                {({isSubmitting}) => (
                    <Form>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only friends</option>
                            <option value="false">No subscriptions</option>
                        </Field>
                        <Field name="term" type="text"/>
                        <button type="submit" disabled={isSubmitting}>Find</button>
                    </Form>)}
            </Formik>
        </div>
    )
}

export default UsersSearchForm