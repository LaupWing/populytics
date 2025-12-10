import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Inloggen"
            description="Vul je e-mail en wachtwoord in om in te loggen"
        >
            <Head title="Inloggen" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
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
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
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
                                <div className="flex items-center">
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
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm hover:underline"
                                            tabIndex={5}
                                            style={{ color: '#004876' }}
                                        >
                                            Wachtwoord vergeten?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
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

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    style={{ borderColor: '#004876' }}
                                />
                                <Label
                                    htmlFor="remember"
                                    style={{ color: '#004876', cursor: 'pointer' }}
                                >
                                    Onthoud mij
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full rounded-md transition-all hover:opacity-90"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    background: '#004876',
                                    color: 'white',
                                    border: '2px solid #004876',
                                    padding: '0.75rem',
                                }}
                            >
                                {processing && <Spinner />}
                                Inloggen
                            </Button>
                        </div>

                        {canRegister && (
                            <div
                                className="text-center text-sm"
                                style={{ color: '#004876' }}
                            >
                                Nog geen account?{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="font-semibold hover:underline"
                                    style={{ color: '#00A6D6' }}
                                >
                                    Registreren
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div
                    className="mb-4 text-center text-sm font-medium"
                    style={{ color: '#00A6D6' }}
                >
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
