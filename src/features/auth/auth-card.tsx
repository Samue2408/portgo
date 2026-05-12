"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Indica tu nombre"),
});

export function AuthCard() {
  const router = useRouter();
  const params = useSearchParams();
  const defaultTab = params.get("tab") === "register" ? "register" : "login";
  const redirect = params.get("redirect") ?? "/dashboard";

  const [tab, setTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const supabase = useMemo(() => createClient(), []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los datos");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "Credenciales incorrectas" : error.message);
      return;
    }
    router.replace(redirect);
    router.refresh();
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    const parsed = registerSchema.safeParse({
      email: regEmail,
      password: regPassword,
      fullName: regName,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los datos");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: { full_name: parsed.data.fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      router.replace(redirect);
      router.refresh();
    } else {
      toast.message("Revisa tu correo", {
        description: "Si la confirmación está activa en Supabase, debes validar el enlace antes de entrar.",
      });
    }
  }

  return (
    <Card className="border-border/80 shadow-xl">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div>
          <CardTitle className="text-2xl">Bienvenido a PortGo</CardTitle>
          <CardDescription>Accede o crea una cuenta para el panel educativo.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4 pt-4" onSubmit={onLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Entrando…" : "Entrar"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form className="space-y-4 pt-4" onSubmit={onRegister}>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="María Pérez" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Correo</Label>
                <Input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Contraseña</Label>
                <Input
                  id="reg-password"
                  type="password"
                  autoComplete="new-password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Creando cuenta…" : "Crear cuenta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="underline-offset-4 hover:underline">
            Volver al inicio
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
