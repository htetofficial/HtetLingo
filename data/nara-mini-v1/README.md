---
language:
  - my
  - en
license: apache-2.0
pipeline_tag: text-to-speech
tags:
  - nara
  - kokoro
  - burmese
  - onnx
  - text-to-speech
---

# Nara Mini v1

Nara Mini v1 is a Kokoro-based text-to-speech model adapted for Burmese and
English, with four preset voices and local inference support.

[Nara Audio website](https://naraaudio.app)

**Attribution when redistributing:** commercial use is permitted under Apache
2.0. If you redistribute this model or a derivative, preserve the applicable
Nara Mini v1 attribution and supply the required license and notices. See
[Attribution and redistribution](#attribution-and-redistribution) below.

The four voices were developed using synthetic speech generated with VoxCPM2.
The exact starting Kokoro checkpoint version has not been recorded in the
available release documentation.

## Voices

| Voice ID | Display name |
| --- | --- |
| `shoon` | Shoon |
| `thazin` | Thazin |
| `ko-banyar` | Ko Banyar |
| `htet-myat` | Htet Myat |

Each voice uses its own network and matching voicepack. Audio output is
24 kHz mono. Matching voice metadata supplies the vocabulary and style vectors.

## Text processing

Inference uses Nara Mini v1's Burmese pronunciation rules, exceptions lexicon,
English phonemization, and matching symbol IDs. Burmese number normalization
converts supported numeric expressions to spoken words before phonemization.

## Export formats

`weights/<voice>/model.safetensors` contains the original full-precision
inference tensors. Keys have the form `<module>.<parameter>`, with modules
`bert`, `bert_encoder`, `predictor`, `text_encoder`, and `decoder`. The matching
architecture settings are in `config.json`. The vocabulary, style
vectors, and length-bin centers are in `onnx/<voice>/voice.json`.

The mobile ONNX export in `onnx/<voice>/` uses a full-precision encoder and
a selectively quantized INT8 decoder, with matching `voice.json` metadata.
`packages/nara-mini-1-<voice>.nara` packages the ONNX graphs and metadata with
file checksums for installation in the Nara app. `SHA256SUMS` records release
file hashes.

## Run inference

Use Python 3.10 or newer.

```sh
pip install huggingface_hub
hf download YeeNyunn/nara-mini-v1 --local-dir nara-mini-v1
cd nara-mini-v1
pip install -r requirements.txt
python synthesize.py --voice shoon --text "မင်္ဂလာပါ။ Hello world." --output speech.wav
```

The example runs the ONNX encoder and decoder on CPU. Use `--threads` to set
the CPU thread count. Use `--no-normalize-numbers` to preserve numeric text.
English phonemization uses Misaki and its eSpeak dependency. Those dependencies
retain their respective licenses.

## Limitations

Pronunciation and prosody can vary with text and language mixing. Number
normalization follows Burmese reading rules, including in mixed-language text.
Long passages are processed in shorter pieces. Performance depends on device
hardware, export format, and passage length.

## License and acknowledgments

Nara Mini v1 is released under Apache 2.0. See `LICENSE` and `NOTICE`.

Kokoro provides the base model. VoxCPM2 provided synthetic speech used to
develop the four preset voices.

- [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M)
- [VoxCPM2](https://huggingface.co/openbmb/VoxCPM2)

## Attribution and redistribution

Nara Mini v1 is available for commercial and non-commercial use under the
[Apache License 2.0](LICENSE). Redistribution of the model or derivative works
must comply with that license, including section 4:

- Give recipients a copy of the Apache 2.0 license.
- For distributed derivative works, include a readable copy of the applicable
  attribution notices from [NOTICE](NOTICE). These identify **Nara Mini v1**,
  **Nara contributors**, **https://naraaudio.app**, and the applicable upstream
  acknowledgments. Section 4(d) permits these notices in a distributed NOTICE
  file, accompanying source or documentation, or an appropriate third-party
  notices display.
- Retain applicable copyright and attribution notices in source-form
  derivatives, as required by section 4(c).
- Mark modified files with prominent notices stating that they were changed,
  as required by section 4(b).

Your application or engine may use its own product name. Renaming or repackaging
does not remove applicable license and attribution obligations; preserve the
Nara Mini v1 identity in the required attribution notices.

Recommended additional wording for an About or model-information screen:

> Uses Nara Mini v1 by Nara contributors, a Kokoro-based Burmese and English
> speech model. https://naraaudio.app — https://huggingface.co/YeeNyunn/nara-mini-v1
> Licensed under Apache 2.0; see the accompanying LICENSE and NOTICE.

This short display text supplements, rather than replaces, the complete
applicable notices. This section explains the existing license; it does not
add a mandatory product name, advertising credit, or other restriction beyond
Apache 2.0. The LICENSE and NOTICE remain unchanged.
