def verify_field(parsed_data):
    #Permite verificar un campo específico por su ISO Bit o alias
    print("\nVerificar por:")
    print("1. ISO Bit")
    print("2. Nombre del campo (alias)")
    
    option = input("Seleccione una opción (1/2): ").strip()
    
    if option == "1":
        try:
            iso_bit = int(input("Ingrese el ISO Bit del campo a verificar (ej. 2, 3, etc.): "))
            alias = input("Si hay múltiples campos con este ISO Bit, ingrese el alias (o deje vacío para el primero): ").strip()
            expected_value = input("Ingrese el valor esperado para este campo: ").strip()

            found = False
            for field in parsed_data:
                if field.isoBit == iso_bit and (not alias or field.alias == alias):
                    found = True
                    if field.data == expected_value:
                        print(f"\n✓ Verificación exitosa para DE{iso_bit:03d} ({field.alias})")
                        print(f"Valor esperado: {expected_value}")
                        print(f"Valor encontrado: {field.data}")
                    else:
                        print(f"\n✗ Verificación fallida para DE{iso_bit:03d} ({field.alias})")
                        print(f"Valor esperado: {expected_value}")
                        print(f"Valor encontrado: {field.data}")
                    break

            if not found:
                if alias:
                    print(f"\nNo se encontró el campo con ISO Bit {iso_bit} y alias '{alias}' en la trama parseada")
                else:
                    print(f"\nNo se encontró el campo con ISO Bit {iso_bit} en la trama parseada")

        except ValueError:
            print("Error: El ISO Bit debe ser un número entero")
    
    elif option == "2":
        alias = input("Ingrese el nombre del campo (alias) a verificar: ").strip()
        expected_value = input("Ingrese el valor esperado para este campo: ").strip()
        
        found = False
        for field in parsed_data:
            if field.alias == alias:
                found = True
                if field.data == expected_value:
                    print(f"\n✓ Verificación exitosa para {alias} (DE{field.isoBit:03d})")
                    print(f"Valor esperado: {expected_value}")
                    print(f"Valor encontrado: {field.data}")
                else:
                    print(f"\n✗ Verificación fallida para {alias} (DE{field.isoBit:03d})")
                    print(f"Valor esperado: {expected_value}")
                    print(f"Valor encontrado: {field.data}")
                break
                
        if not found:
            print(f"\nNo se encontró el campo con alias '{alias}' en la trama parseada")
    
    else:
        print("Opción no válida. Intente nuevamente.")

def display_parsed_data(parsed_data):
    """Muestra los resultados en formato tabular con opciones de ordenamiento"""
    
    # Preguntar por el tipo de ordenamiento antes de mostrar
    print("\nOpciones de ordenamiento:")
    print("1. Numérico (orden de aparición)")
    print("2. Alfabético (por nombre de campo)")
    
    sort_option = input("Seleccione el tipo de ordenamiento (1/2): ").strip()
    
    # Crear una copia de los datos para ordenar
    display_data = parsed_data.copy()
    
    if sort_option == "2":
        # Ordenar alfabéticamente por alias
        display_data.sort(key=lambda x: x.alias.lower())
        sort_type = "alfabético"
    else:
        # Mantener orden numérico (por defecto)
        sort_type = "numérico"
    
    # Calcular anchos necesarios basados en el contenido más largo
    column_widths = {
        'number': max(len(str(len(display_data))), 3),
        'iso_bit': max(len(f"DE{field.isoBit:03d}" if field.isoBit > 0 else "-")
                      for field in display_data),
        'alias': max(len(field.alias) for field in display_data),
        'value': max(len(field.data) for field in display_data)
    }

    # Ajustar anchos mínimos
    column_widths = {
        'number': max(column_widths['number'], 5),
        'iso_bit': max(column_widths['iso_bit'], 8),
        'alias': max(column_widths['alias'], 20),
        'value': max(column_widths['value'], 30)
    }

    # Construir formato dinámico
    def build_line(num, iso, alias, value):
        return f"| {str(num).ljust(column_widths['number'])} " \
               f"| {iso.ljust(column_widths['iso_bit'])} " \
               f"| {alias.ljust(column_widths['alias'])} " \
               f"| {value.ljust(column_widths['value'])} |"

    # Construir separador
    separator = "+" + "-"*(column_widths['number']+2) \
                + "+" + "-"*(column_widths['iso_bit']+2) \
                + "+" + "-"*(column_widths['alias']+2) \
                + "+" + "-"*(column_widths['value']+2) + "+"

    # Imprimir tabla
    lines = []
    lines.append(f"RESULTADO DEL PARSEO (Ordenamiento {sort_type}):")
    lines.append(separator)
    lines.append(build_line("N", "ISOBit", "Nombre Campo", "Valor Almacenado"))
    lines.append(separator)

    for idx, field in enumerate(display_data, start=1):
        iso_bit = f"DE{field.isoBit:03d}" if field.isoBit > 0 else "-"
        lines.append(build_line(idx, iso_bit, field.alias, field.data))

    lines.append(separator)
    lines.append(f"\nTotal de campos parseados: {len(display_data)}")
    lines.append(f"Tipo de ordenamiento: {sort_type}")

    # Mostrar en pantalla
    print("\n".join(lines))
    
    # Crear nombre de archivo con fecha y hora
    timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    output_dir = os.getcwd()
    filename_prefix = f'Salida_Parseada_{sort_type}'
    output_file = f"{output_dir}/{filename_prefix}_{timestamp}.txt"

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
        f.write("\n")

    print(f"\nResultado guardado en: {output_file}")
import datetime, os
