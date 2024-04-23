import { useState } from 'react';
import { z } from 'zod';

const FormData = z.object({
  name: z.string().min(2).max(50).default(""),
  email: z.string().email().default(""),
  message: z.string().min(5).default("")
}).default({})
type FormData = z.infer<typeof FormData>

export const ZodSample = () => {
  const [formData, setFormData] = useState<FormData>(FormData.parse({}))


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(FormData.safeParse(formData))
  }

  return (
    <>
      <h2>お問合せフォーム</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>お名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="message">お問い合わせ内容</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit">送信</button>
        </div>
      </form>
    </>
  )
}