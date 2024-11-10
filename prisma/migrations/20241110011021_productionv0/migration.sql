-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('taxi', 'carro', 'camioneta');

-- CreateEnum
CREATE TYPE "user_rol" AS ENUM ('cliente', 'admin', 'empleado');

-- CreateEnum
CREATE TYPE "cita_estado" AS ENUM ('pendiente', 'confirmada', 'cancelada', 'finalizada');

-- CreateTable
CREATE TABLE "tipo_auto" (
    "id" SERIAL NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "tipo_auto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auto" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "tipoAutoId" INTEGER NOT NULL,

    CONSTRAINT "auto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cita" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TIME(0) NOT NULL,
    "tipoServicioId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "empleadoId" INTEGER,
    "autoId" INTEGER NOT NULL,
    "estado" "cita_estado" NOT NULL DEFAULT 'pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposervicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "tiposervicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "telefono" TEXT NOT NULL,
    "contrasena" TEXT,
    "rol" "user_rol" NOT NULL DEFAULT 'cliente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auto_placa_key" ON "auto"("placa");

-- CreateIndex
CREATE INDEX "Auto_tipoAutoId_index" ON "auto"("tipoAutoId");

-- CreateIndex
CREATE INDEX "Cita_autoId_fkey" ON "cita"("autoId");

-- CreateIndex
CREATE INDEX "Cita_clienteId_fkey" ON "cita"("clienteId");

-- CreateIndex
CREATE INDEX "Cita_empleadoId_fkey" ON "cita"("empleadoId");

-- CreateIndex
CREATE INDEX "Cita_tipoServicioId_fkey" ON "cita"("tipoServicioId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_telefono_key" ON "users"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_key" ON "VerificationToken"("identifier");

-- AddForeignKey
ALTER TABLE "auto" ADD CONSTRAINT "auto_tipoAutoId_fkey" FOREIGN KEY ("tipoAutoId") REFERENCES "tipo_auto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cita" ADD CONSTRAINT "cita_autoId_fkey" FOREIGN KEY ("autoId") REFERENCES "auto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cita" ADD CONSTRAINT "cita_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cita" ADD CONSTRAINT "cita_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cita" ADD CONSTRAINT "cita_tipoServicioId_fkey" FOREIGN KEY ("tipoServicioId") REFERENCES "tiposervicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
