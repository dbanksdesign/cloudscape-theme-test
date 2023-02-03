// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export var AceModes = [
    { value: 'abap', label: 'ABAP' },
    { value: 'abc', label: 'ABC' },
    { value: 'actionscript', label: 'ActionScript' },
    { value: 'ada', label: 'ADA' },
    { value: 'alda', label: 'Alda' },
    { value: 'apache_conf', label: 'Apache Conf' },
    { value: 'apex', label: 'Apex' },
    { value: 'aql', label: 'AQL' },
    { value: 'asciidoc', label: 'AsciiDoc' },
    { value: 'asl', label: 'ASL' },
    { value: 'assembly_x86', label: 'Assembly x86' },
    { value: 'autohotkey', label: 'AutoHotkey/AutoIt' },
    { value: 'batchfile', label: 'BatchFile' },
    { value: 'c_cpp', label: 'C/C++' },
    { value: 'c9search', label: 'C9Search' },
    { value: 'cirru', label: 'Cirru' },
    { value: 'clojure', label: 'Clojure' },
    { value: 'cobol', label: 'Cobol' },
    { value: 'coffee', label: 'CoffeeScript' },
    { value: 'coldfusion', label: 'ColdFusion' },
    { value: 'crystal', label: 'Crystal' },
    { value: 'csharp', label: 'C#' },
    { value: 'csound_document', label: 'Csound Document' },
    { value: 'csound_orchestra', label: 'Csound' },
    { value: 'csound_score', label: 'Csound Score' },
    { value: 'css', label: 'CSS' },
    { value: 'curly', label: 'Curly' },
    { value: 'd', label: 'D' },
    { value: 'dart', label: 'Dart' },
    { value: 'diff', label: 'Diff' },
    { value: 'django', label: 'Django' },
    { value: 'dockerfile', label: 'Dockerfile' },
    { value: 'dot', label: 'Dot' },
    { value: 'drools', label: 'Drools' },
    { value: 'edifact', label: 'Edifact' },
    { value: 'eiffel', label: 'Eiffel' },
    { value: 'ejs', label: 'EJS' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'elm', label: 'Elm' },
    { value: 'erlang', label: 'Erlang' },
    { value: 'forth', label: 'Forth' },
    { value: 'fortran', label: 'Fortran' },
    { value: 'fsharp', label: 'FSharp' },
    { value: 'fsl', label: 'FSL' },
    { value: 'ftl', label: 'FreeMarker' },
    { value: 'gcode', label: 'Gcode' },
    { value: 'gherkin', label: 'Gherkin' },
    { value: 'gitignore', label: 'Gitignore' },
    { value: 'glsl', label: 'Glsl' },
    { value: 'gobstones', label: 'Gobstones' },
    { value: 'golang', label: 'Go' },
    { value: 'graphqlschema', label: 'GraphQLSchema' },
    { value: 'groovy', label: 'Groovy' },
    { value: 'haml', label: 'HAML' },
    { value: 'handlebars', label: 'Handlebars' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'haskell_cabal', label: 'Haskell Cabal' },
    { value: 'haxe', label: 'haXe' },
    { value: 'hjson', label: 'Hjson' },
    { value: 'html', label: 'HTML' },
    { value: 'html_elixir', label: 'HTML (Elixir)' },
    { value: 'html_ruby', label: 'HTML (Ruby)' },
    { value: 'ini', label: 'INI' },
    { value: 'io', label: 'Io' },
    { value: 'jack', label: 'Jack' },
    { value: 'jade', label: 'Jade' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'json', label: 'JSON' },
    { value: 'json5', label: 'JSON5' },
    { value: 'jsoniq', label: 'JSONiq' },
    { value: 'jsp', label: 'JSP' },
    { value: 'jssm', label: 'JSSM' },
    { value: 'jsx', label: 'JSX' },
    { value: 'julia', label: 'Julia' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'latex', label: 'LaTeX' },
    { value: 'less', label: 'LESS' },
    { value: 'liquid', label: 'Liquid' },
    { value: 'lisp', label: 'Lisp' },
    { value: 'livescript', label: 'LiveScript' },
    { value: 'logiql', label: 'LogiQL' },
    { value: 'lsl', label: 'LSL' },
    { value: 'lua', label: 'Lua' },
    { value: 'luapage', label: 'LuaPage' },
    { value: 'lucene', label: 'Lucene' },
    { value: 'makefile', label: 'Makefile' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'mask', label: 'Mask' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'maze', label: 'Maze' },
    { value: 'mediawiki', label: 'MediaWiki' },
    { value: 'mel', label: 'MEL' },
    { value: 'mixal', label: 'MIXAL' },
    { value: 'mushcode', label: 'MUSHCode' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'nginx', label: 'Nginx' },
    { value: 'nim', label: 'Nim' },
    { value: 'nix', label: 'Nix' },
    { value: 'nsis', label: 'NSIS' },
    { value: 'nunjucks', label: 'Nunjucks' },
    { value: 'objectivec', label: 'Objective-C' },
    { value: 'ocaml', label: 'OCaml' },
    { value: 'pascal', label: 'Pascal' },
    { value: 'perl', label: 'Perl' },
    { value: 'perl6', label: 'Perl 6' },
    { value: 'pgsql', label: 'pgSQL' },
    { value: 'php', label: 'PHP' },
    { value: 'php_laravel_blade', label: 'PHP (Blade Template)' },
    { value: 'pig', label: 'Pig' },
    { value: 'powershell', label: 'Powershell' },
    { value: 'praat', label: 'Praat' },
    { value: 'prisma', label: 'Prisma' },
    { value: 'prolog', label: 'Prolog' },
    { value: 'properties', label: 'Properties' },
    { value: 'protobuf', label: 'Protobuf' },
    { value: 'puppet', label: 'Puppet' },
    { value: 'python', label: 'Python' },
    { value: 'qml', label: 'QML' },
    { value: 'r', label: 'R' },
    { value: 'razor', label: 'Razor' },
    { value: 'rdoc', label: 'RDoc' },
    { value: 'red', label: 'Red' },
    { value: 'rhtml', label: 'RHTML' },
    { value: 'rst', label: 'RST' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'rust', label: 'Rust' },
    { value: 'sass', label: 'SASS' },
    { value: 'scad', label: 'SCAD' },
    { value: 'scala', label: 'Scala' },
    { value: 'scheme', label: 'Scheme' },
    { value: 'scss', label: 'SCSS' },
    { value: 'sh', label: 'SH' },
    { value: 'sjs', label: 'SJS' },
    { value: 'slim', label: 'Slim' },
    { value: 'smarty', label: 'Smarty' },
    { value: 'snippets', label: 'snippets' },
    { value: 'soy_template', label: 'Soy Template' },
    { value: 'space', label: 'Space' },
    { value: 'sql', label: 'SQL' },
    { value: 'sqlserver', label: 'SQLServer' },
    { value: 'stylus', label: 'Stylus' },
    { value: 'svg', label: 'SVG' },
    { value: 'swift', label: 'Swift' },
    { value: 'tcl', label: 'Tcl' },
    { value: 'terraform', label: 'Terraform' },
    { value: 'tex', label: 'Tex' },
    { value: 'text', label: 'Text' },
    { value: 'textile', label: 'Textile' },
    { value: 'toml', label: 'Toml' },
    { value: 'tsx', label: 'TSX' },
    { value: 'twig', label: 'Twig' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'vala', label: 'Vala' },
    { value: 'vbscript', label: 'VBScript' },
    { value: 'velocity', label: 'Velocity' },
    { value: 'verilog', label: 'Verilog' },
    { value: 'vhdl', label: 'VHDL' },
    { value: 'visualforce', label: 'Visualforce' },
    { value: 'wollok', label: 'Wollok' },
    { value: 'xml', label: 'XML' },
    { value: 'xquery', label: 'XQuery' },
    { value: 'yaml', label: 'YAML' },
    { value: 'zeek', label: 'Zeek' },
];
//# sourceMappingURL=ace-modes.js.map