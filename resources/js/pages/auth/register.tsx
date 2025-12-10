import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Account aanmaken"
            description="Vul je gegevens in om een account aan te maken"
        >
            <Head title="Registreren" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#00A6D6',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    Naam
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Volledige naam"
                                    className="rounded-md"
                                    style={{
                                        border: '1px solid #004876',
                                        color: '#004876',
                                        padding: '0.75rem',
                                    }}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#00A6D6',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    E-mailadres
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@voorbeeld.nl"
                                    className="rounded-md"
                                    style={{
                                        border: '1px solid #004876',
                                        color: '#004876',
                                        padding: '0.75rem',
                                    }}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#00A6D6',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    Wachtwoord
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Wachtwoord"
                                    className="rounded-md"
                                    style={{
                                        border: '1px solid #004876',
                                        color: '#004876',
                                        padding: '0.75rem',
                                    }}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#00A6D6',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    Bevestig wachtwoord
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Bevestig wachtwoord"
                                    className="rounded-md"
                                    style={{
                                        border: '1px solid #004876',
                                        color: '#004876',
                                        padding: '0.75rem',
                                    }}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full rounded-md transition-all hover:opacity-90"
                                tabIndex={5}
                                data-test="register-user-button"
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    background: '#00A6D6',
                                    color: 'white',
                                    border: '2px solid #00A6D6',
                                    padding: '0.75rem',
                                }}
                            >
                                {processing && <Spinner />}
                                Account aanmaken
                            </Button>
                        </div>

                        <div
                            className="text-center text-sm"
                            style={{ color: '#004876' }}
                        >
                            Heb je al een account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-semibold hover:underline"
                                style={{ color: '#00A6D6' }}
                            >
                                Inloggen
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
